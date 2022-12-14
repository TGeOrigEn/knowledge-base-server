import { Pool, QueryResult } from 'pg';
import { TokenGenerator } from 'ts-token-generator';

export default class BaseController {

    private static readonly SEPARATOR: string = ', ';

    private static readonly OPERATOR_AND: string = ' AND ';

    private static readonly tokenGenerator = new TokenGenerator();

    private constructor() { };

    private static token: string[] = [];

    private static tokenVerification(columns: string[], values: string[]): { verified: boolean, columns: string[], values: string[] } {
        const index: number = columns.indexOf("token");
        var verified: boolean = false;

        if (index !== -1) {
            var token: string = "";

            console.log(`Before: ${columns}`);
            console.log(columns.splice(index, 1));
            console.log(`After: ${columns}`);

            console.log(`Before: ${values}`);
            console.log(token = values.splice(index, 1)[0]);
            console.log(`After: ${values}`);

            verified = BaseController.token.includes(token);
            console.log(verified);
        }

        return { verified: verified, columns: columns, values: values };
    }

    public static login = async (database: Pool, login: string, password: string): Promise<string | undefined> => {
        console.log(`LOGIN: ${login}`);
        console.log(`PASSWORD: ${password}`);
        
        console.log(`SELECT * FROM users WHERE login = '${login}' AND password = '${password}'`);
        const rowCount = (await database.query(`SELECT * FROM users WHERE login = '${login}' AND password = '${password}'`)).rowCount;
        const token = BaseController.tokenGenerator.generate();

        if (rowCount != 0) {
            BaseController.token.push(token);
            return token;
        }

        return undefined;
    };

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
            console.log(columns.splice(index, 1));
            console.log(`After: ${columns}`);

            console.log(`Before: ${values}`);
            console.log(values.splice(index, 1));
            console.log(`After: ${values}`);
        }

        return `INSERT INTO ${table} (${columns.join(this.SEPARATOR)}) values (${this.formatRequestValues(values).join(this.SEPARATOR)}) RETURNING *`;
    }

    private static formatUpdateRequest(table: string, id: number, columns: string[], values: string[]) {
        const index: number = columns.indexOf("id");

        if (index !== -1) {
            console.log(columns);
            console.log(columns.splice(index, 1));
            console.log(columns);

            console.log(values);
            console.log(values.splice(index, 1));
            console.log(values);
        }

        return `UPDATE ${table} SET ${this.formatRequestParameters(columns, this.formatRequestValues(values), BaseController.SEPARATOR)} WHERE id = ${id} RETURNING *`;
    }

    public static selectionRequestAll = async (database: Pool, table): Promise<QueryResult<any>> => {
        return await database.query(`SELECT * FROM ${table}`);
    };

    public static selectionRequestBy = async (database: Pool, table: string, columns: string[], values: string[]): Promise<QueryResult<any>> => {
        return await database.query(`SELECT * FROM ${table} WHERE ${this.formatRequestParameters(columns, this.formatRequestValues(values), BaseController.OPERATOR_AND)}`);
    };

    public static tokenRequest = async (token: string) => {
        return await BaseController.token.includes(token);
    };

    public static updationRequest = async (database: Pool, table: string, id: number, columns: string[], values: string[]): Promise<QueryResult<any>> => {
        const value = BaseController.tokenVerification(columns, values);
        if (!value.verified) return undefined;
        return await database.query(this.formatUpdateRequest(table, id, columns, values));
    };

    public static deletionRequestBy = async (database: Pool, table: string, columns: string[], values: string[]): Promise<QueryResult<any>> => {
        const value = BaseController.tokenVerification(columns, values);
        if (!value.verified) return undefined;
        return await database.query(`DELETE FROM ${table} WHERE ${this.formatRequestParameters(value.columns, this.formatRequestValues(value.values), BaseController.OPERATOR_AND)}`);
    };

    public static insertionRequest = async (database: Pool, table: string, columns: string[], values: string[]): Promise<QueryResult<any>> => {
        const value = BaseController.tokenVerification(columns, values);
        if (!value.verified) return undefined;
        return await database.query(this.formatInsertionRequest(table, value.columns, value.values));
    };
};