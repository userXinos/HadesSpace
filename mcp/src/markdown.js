import { t } from './i18n.js';

const MAX_HEADING = 6;
const ENTITY_LEVEL = 3;

const MIN_COLUMNS = 2;
const MIN_ROWS = 2;
const AXIS_COVERAGE = 0.6;
const SIBLING_TOLERANCE = 1;
const RAGGED_MERGE = 0.9;

const NAME_KEY = /^name$/i;
const ICON_KEYS = new Set(['icon', 'icons']);

function escapeCell(text) {
    return text.replace(/\|/g, '\\|').replace(/\n/g, '<br>');
}

/**
 * @param {string} text
 * @return {string}
 */
export function interpolate(text) {
    return text.replace(/\{\{\s*([^\s}]+?)\s*\}\}/g, (match, key) => escapeCell(t(key)));
}

function renderScalar(value) {
    if (typeof value === 'string') return escapeCell(value);
    return `\`${JSON.stringify(value)}\``;
}

/**
 * @return {string}
 */
function renderColumn(value) {
    return typeof value === 'string' ? escapeCell(value) : String(value);
}

/**
 * @return {boolean}
 */
function isFlat(value) {
    return Array.isArray(value) && value.every((element) => element === null || typeof element !== 'object');
}

function isInline(value) {
    if (value === null || typeof value !== 'object') return true;
    if (Array.isArray(value)) return value.every(isInline);
    return false;
}

/**
 * @return {string}
 */
function renderValue(value) {
    if (!Array.isArray(value) || value.length === 0) return renderScalar(value);
    return value.map(renderValue).join(', ');
}

/**
 * @return {string}
 */
function renderIcon(value) {
    if (Array.isArray(value)) return value.map(renderIcon).join(' ');
    return typeof value === 'string' && value ? `![icon](${value})` : renderScalar(value);
}

function renderCell(key, value) {
    return ICON_KEYS.has(key) ? renderIcon(value) : renderValue(value);
}

/**
 * @return {string}
 */
function heading(level, text) {
    return level > MAX_HEADING ? `**${text}**` : `${'#'.repeat(level)} ${text}`;
}

function ensureBlank(out) {
    if (out.length > 0 && out[out.length - 1] !== '') out.push('');
}

function dropTrailingBlanks(lines) {
    while (lines.length > 0 && lines[lines.length - 1] === '') lines.pop();
    return lines;
}

function elementLabel(element) {
    return typeof element.Name === 'string' ? element.Name : '';
}

function splitKeys(record, skip) {
    const inlineKeys = [];
    const blockKeys = [];
    for (const key of Object.keys(record)) {
        if (skip && skip.has(key)) continue;
        if (isInline(record[key])) inlineKeys.push(key);
        else blockKeys.push(key);
    }
    return { inlineKeys, blockKeys };
}

function renderTable(record, keys, out) {
    out.push('| Field | Value |');
    out.push('| --- | --- |');
    for (const key of keys) {
        out.push(`| ${key} | ${renderCell(key, record[key])} |`);
    }
}

function renderRecord(record, level, out) {
    const { inlineKeys, blockKeys } = splitKeys(record);

    if (inlineKeys.length > 0) {
        renderTable(record, inlineKeys, out);
    } else if (blockKeys.length === 0) {
        out.push('_empty_');
    }

    for (const key of blockKeys) {
        renderBlock(key, record[key], level + 1, out);
    }
}

function renderArray(value, level, out) {
    let scalars = null;

    for (let i = 0; i < value.length; i++) {
        const element = value[i];
        if (isInline(element)) {
            if (scalars === null) scalars = ['| # | Value |', '| --- | --- |'];
            scalars.push(`| ${i} | ${renderValue(element)} |`);
            continue;
        }

        if (scalars !== null) {
            ensureBlank(out);
            out.push(...scalars);
            scalars = null;
        }

        if (Array.isArray(element)) {
            out.push(indexHeading(i, '', level + 1));
            out.push('');
            renderArray(element, level + 1, out);
            continue;
        }

        out.push(indexHeading(i, elementLabel(element), level + 1));
        out.push('');
        renderRecord(element, level + 1, out);
    }

    if (scalars !== null) {
        ensureBlank(out);
        out.push(...scalars);
    }
}

function indexHeading(index, label, level) {
    return heading(level, label ? `[${index}] ${label}` : `[${index}]`);
}

function renderBlock(key, value, level, out) {
    ensureBlank(out);
    out.push(heading(level, key));
    out.push('');

    if (Array.isArray(value)) renderArray(value, level, out);
    else renderRecord(value, level, out);
}

function renderLevels(levels, out) {
    const width = levels.columns.length;

    ensureBlank(out);
    out.push(`| lvl | ${levels.columns.map(renderColumn).join(' | ')} |`);
    out.push(`| --- | ${Array.from({ length: width }, () => '---').join(' | ')} |`);

    for (const [key, values] of levels.rows) {
        out.push(`| ${key} | ${values.map((value) => renderCell(key, value)).join(' | ')} |`);
    }
}

/**
 * @param {Record<string, unknown>} entity
 * @return {{columns: Array<string|number>, rows: [string, unknown[]][], consumed: Set<string>}|null}
 */
export function pickLevels(entity) {
    const candidates = Object.entries(entity)
        .filter(([key, value]) => !ICON_KEYS.has(key) && isFlat(value) && value.length >= MIN_COLUMNS);

    if (candidates.length < MIN_ROWS) return null;

    /** @type {Map<number, string[]>} */
    const families = new Map();
    for (const [key, value] of candidates) {
        if (!families.has(value.length)) families.set(value.length, []);
        families.get(value.length).push(key);
    }

    const sorted = [...families.entries()].sort((a, b) => b[0] - a[0]);
    const [[width, head]] = sorted;
    if (head.length < MIN_ROWS) return null;

    // Ось не набирает покрытия сама по себе — но почти-ось спасает семейство той же ширины.
    const runnerSize = sorted[1]?.[1].length ?? 0;
    if (head.length / candidates.length < AXIS_COVERAGE && Math.abs(head.length - runnerSize) > SIBLING_TOLERANCE) {
        return null;
    }

    const named = head.find((key) => NAME_KEY.test(key) && entity[key].every((element) => typeof element === 'string'));
    const columns = named ? [...entity[named]] : Array.from({ length: width }, (unused, i) => i + 1);

    // Подписи оси уезжают в заголовок колонок — повторять их же строкой незачем.
    const rows = sorted
        .filter(([size]) => size >= width * RAGGED_MERGE)
        .flatMap(([, keys]) => keys.filter((key) => key !== named).map((key) => [key, [...entity[key]]]));

    if (!rows.length) return null;

    for (const [, values] of rows) {
        while (values.length < columns.length) values.push(null);
    }

    const consumed = new Set(rows.map(([key]) => key));
    if (named) consumed.add(named);

    return { columns, rows, consumed };
}

/**
 * @param {Record<string, unknown>} entity обработанная сущность из датасета
 * @param {object} [options]
 * @param {number} [options.level] уровень заголовка сущности
 * @param {string} [options.id] запасная подпись, если у сущности нет Name
 * @return {string} md с завершающим переводом строки; '' если рендерить нечего
 */
export function renderEntity(entity, { level = ENTITY_LEVEL, id = '' } = {}) {
    if (entity === null || typeof entity !== 'object' || Array.isArray(entity)) return '';

    const name = typeof entity.Name === 'string' && entity.Name ? entity.Name : id;
    const levels = pickLevels(entity);
    const { inlineKeys, blockKeys } = splitKeys(entity, levels?.consumed);

    const lines = [];
    if (name) lines.push(heading(level, name));

    if (inlineKeys.length > 0) {
        ensureBlank(lines);
        renderTable(entity, inlineKeys, lines);
    } else if (blockKeys.length === 0 && !levels) {
        ensureBlank(lines);
        lines.push('_no simple fields');
    }

    if (levels) renderLevels(levels, lines);

    for (const key of blockKeys) {
        renderBlock(key, entity[key], level + 1, lines);
    }

    return dropTrailingBlanks(lines).length ? `${lines.join('\n')}\n` : '';
}

/**
 * @return {string} ТЕЛО документа, без базового markdown
 */
export function toMarkdown(collections) {
    const collectionIds = Object.keys(collections).sort();

    let entitiesCount = 0;
    let fieldsCount = 0;
    for (const cid of collectionIds) {
        for (const eid of Object.keys(collections[cid])) {
            entitiesCount++;
            fieldsCount += Object.keys(collections[cid][eid]).length;
        }
    }

    const lines = [
        `Collections: ${collectionIds.length}, entities: ${entitiesCount}, fields: ${fieldsCount}.`,
        '',
        '## Content',
        '',
        ...collectionIds.map((cid) => `- [${cid}](#${cid}) — ${Object.keys(collections[cid]).length}`),
        '',
        '___',
        '',
    ];

    for (const cid of collectionIds) {
        lines.push(`## ${cid}`, '');

        const entityIds = Object.keys(collections[cid]);
        if (entityIds.length === 0) {
            lines.push('_no entities', '');
            continue;
        }

        for (const eid of entityIds) {
            lines.push(renderEntity(collections[cid][eid], { level: ENTITY_LEVEL, id: eid }).trimEnd(), '');
        }
    }

    return `${dropTrailingBlanks(lines).join('\n')}\n`;
}
