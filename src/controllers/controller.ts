import { Pool, QueryResult } from 'pg';

export default class Controller {

    private static readonly SEPARATOR: string = ', ';

    private constructor() { }

    private static formatRequestParameters(columns: string[], values: string[]): string {
        var params: string[] = [];

        for (var index = 0; index <= columns.length; index++)
            params.push(`${columns[index]} = ${values[index]}`);

        return params.join(this.SEPARATOR);
    }

    public static async selectionRequest(database: Pool, table: string, columns: string[], values: string[]): Promise<QueryResult<any>> {
        return await database.query(`SELECT * FROM ${table} WHERE ${this.formatRequestParameters(columns, values)}`);
    }

    public static async updationRequest(database: Pool, table: string, id: number, columns: string[], values: string[]): Promise<QueryResult<any>> {
        return await database.query(`UPDATE ${table} SET ${this.formatRequestParameters(columns, values)} WHERE id = ${id} RETURNING *`);
    }

    public static async deletionRequest(database: Pool, table: string, id: number): Promise<QueryResult<any>> {
        return await database.query(`DELETE FROM ${table} WHERE id = ${id}`);
    }

    public static async insertionRequest(database: Pool, table: string, columns: string[], values: string[]): Promise<QueryResult<any>> {
        return await database.query(`INSERT INTO ${table} (${columns.join(this.SEPARATOR)}) values (${values.join(this.SEPARATOR)}) RETURNING *`);
    }
}