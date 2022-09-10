import { Pool, QueryResult } from 'pg';

export default class BaseController {

    private static readonly SEPARATOR: string = ', ';

    private constructor() { };

    private static formatRequestParameters(columns: string[], values: string[]): string {
        var params: string[] = [];

        for (var index = 0; index < columns.length; index++)
            params.push(`${columns[index]} = ${values[index]}`);

        return params.join(BaseController.SEPARATOR);
    };

    private static formatRequestValues(values: string[]): string[] {
        return values.map(value => `'${value}'`);
    };

    public static async selectionRequest(database: Pool, table: string, column?: string, value?: string): Promise<QueryResult<any>> {
        if (value && column) return await database.query(`SELECT * FROM ${table} WHERE ${column} = ${value}`);
        return await database.query(`SELECT * FROM ${table}`);
    };

    public static async updationRequest(database: Pool, table: string, id: number, columns: string[], values: string[]): Promise<QueryResult<any>> {
        return await database.query(`UPDATE ${table} SET ${BaseController.formatRequestParameters(columns, BaseController.formatRequestValues(values))} WHERE id = ${id} RETURNING *`);
    };

    public static async deletionRequest(database: Pool, table: string, id: number): Promise<QueryResult<any>> {
        return await database.query(`DELETE FROM ${table} WHERE id = ${id}`);
    };

    public static async insertionRequest(database: Pool, table: string, columns: string[], values: string[]): Promise<QueryResult<any>> {
        return await database.query(`INSERT INTO ${table} (${columns.join(BaseController.SEPARATOR)}) values (${BaseController.formatRequestValues(values).join(BaseController.SEPARATOR)}) RETURNING *`);
    };
};