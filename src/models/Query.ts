import { DataTableSortOrderType } from "primereact/datatable";

export interface Query {
    page?: number;
    limit?: number;
    filter_string?: string;
    sort_column?: string;
    sort_order?: DataTableSortOrderType;
}