/**
 * @author WMXPY
 * @namespace Mock
 * @description Driver
 */

import { IRequestConfig, IResponseConfig, RequestDriver } from "@barktler/driver";
import { Generator } from "@sudoo/generator";

// eslint-disable-next-line @typescript-eslint/require-await
export const mockDriver: RequestDriver = async  <Body extends any = any, Data extends any = any>(request: IRequestConfig<Body>): Promise<IResponseConfig<Data>> => {

    if (!request.responseDataPattern) {

        throw new Error('[Barktler] Response data pattern not declared');
    }

    const generator: Generator = Generator.create(request.responseDataPattern);
    const data: Data = generator.generate();

    return {

        data,
        status: 200,
        statusText: 'OK',

        headers: {},
    };
};
