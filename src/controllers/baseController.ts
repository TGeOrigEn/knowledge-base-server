import { Pool, QueryResult } from 'pg';

export default class BaseController {

    private static readonly SEPARATOR: string = ', ';

    private static readonly OPERATOR_AND: string = ' AND ';

    private constructor() { };

    private static formatRequestParameters = (columns: string[], values: string[], separator: string): string => {
        var params: string[] = [];

        for (var index = 0; index < columns.length; index++)
            params.push(`${columns[index]} = ${values[index]}`);

        return params.join(separator);
    };

    private static formatRequestValues = (values: string[]): string[] => {
        return values.map(value => `'${value}'`);
    };

    private static formatInsertionRequest(table: string, columns: string[], values: string[]) {
        const index: number = columns.indexOf("id");

        if (index !== -1) {
            console.log(`Before: ${columns}`);
            console.log(`Remove: ${columns.splice(index, 1)}`);
            console.log(`After: ${columns}\n`);

            console.log(`Before: ${values}`);
            console.log(`Remove: ${values.splice(index, 1)}`);
            console.log(`After: ${values}\n`);
        }

        console.log(`INSERT INTO ${table} (${columns.join(this.SEPARATOR)}) values (${this.formatRequestValues(values).join(this.SEPARATOR)}) RETURNING *`);
        return `INSERT INTO ${table} (${columns.join(this.SEPARATOR)}) values (${this.formatRequestValues(values).join(this.SEPARATOR)}) RETURNING *`;
    }

    private static formatUpdateRequest(table: string, id: number, columns: string[], values: string[]) {
        const index: number = columns.indexOf("id");

        if (index !== -1) {
            console.log(`Before: ${columns}`);
            console.log(`Remove: ${columns.splice(index, 1)}`);
            console.log(`After: ${columns}\n`);

            console.log(`Before: ${values}`);
            console.log(`Remove: ${values.splice(index, 1)}`);
            console.log(`After: ${values}\n`);
        }

        console.log(`UPDATE ${table} SET ${this.formatRequestParameters(columns, this.formatRequestValues(values), BaseController.SEPARATOR)} WHERE id = ${id} RETURNING *`);
        return `UPDATE ${table} SET ${this.formatRequestParameters(columns, this.formatRequestValues(values), BaseController.SEPARATOR)} WHERE id = ${id} RETURNING *`;
    }

    public static selectionRequestAll = async (database: Pool, table): Promise<QueryResult<any>> => {
        return await database.query(`SELECT * FROM ${table}`);
    };

    public static selectionRequestBy = async (database: Pool, table: string, columns: string[], values: string[]): Promise<QueryResult<any>> => {
        return await database.query(`SELECT * FROM ${table} WHERE ${this.formatRequestParameters(columns, this.formatRequestValues(values), BaseController.OPERATOR_AND)}`);
    };

    public static updationRequest = async (database: Pool, table: string, id: number, columns: string[], values: string[]): Promise<QueryResult<any>> => {
        return await database.query(this.formatUpdateRequest(table, id, columns, values));
    };

    public static deletionRequest = async (database: Pool, table: string, id: number): Promise<QueryResult<any>> => {
        return await database.query(`DELETE FROM ${table} WHERE id = ${id}`);
    };

    public static deletionRequestBy = async (database: Pool, table: string, columns: string[], values: string[]): Promise<QueryResult<any>> => {
        return await database.query(`DELETE FROM ${table} WHERE id ${this.formatRequestParameters(columns, this.formatRequestValues(values), BaseController.OPERATOR_AND)}`);
    };

    public static insertionRequest = async (database: Pool, table: string, columns: string[], values: string[]): Promise<QueryResult<any>> => {
        return await database.query(this.formatInsertionRequest(table, columns, values));
    };
};