import { defineMarkdownPlugin } from "../defineMarkdownPlugin";

export const tablePlugin = defineMarkdownPlugin((md) => {
  md.renderer.rules.table_open = function () {
    return `<a-table class="component-api-table">`;
  };
  md.renderer.rules.thead_open = function () {
    return `<a-thead>`;
  };
  md.renderer.rules.tbody_open = function () {
    return `<a-tbody>`;
  };
  md.renderer.rules.tr_open = function () {
    return `<a-tr>`;
  };
  md.renderer.rules.th_open = function () {
    return `<a-th>`;
  };
  md.renderer.rules.td_open = function () {
    return `<a-td>`;
  };
  md.renderer.rules.td_close = function () {
    return `</a-td>`;
  };
  md.renderer.rules.th_close = function () {
    return `</a-th>`;
  };
  md.renderer.rules.tr_close = function () {
    return `</a-tr>`;
  };
  md.renderer.rules.thead_close = function () {
    return `</a-thead>`;
  };
  md.renderer.rules.tbody_close = function () {
    return `</a-tbody>`;
  };
  md.renderer.rules.table_close = function () {
    return `</a-table>`;
  };
});
