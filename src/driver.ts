/**
 * @author WMXPY
 * @namespace Mock
 * @description Driver
 */

import { IRequestConfig, IResponseConfig, PendingRequest, RequestDriver } from "@barktler/driver";
import { Generator } from "@sudoo/generator";

export const createMockDriver = (): RequestDriver => {

    const mockDriver: RequestDriver = <Body extends any = any, Data extends any = any>(request: IRequestConfig<Body>): PendingRequest<Body, Data> => {

        if (!request.responseDataPattern) {

            throw new Error('[Barktler] Response data pattern not declared');
        }

        const generator: Generator = Generator.create(request.responseDataPattern);
        const pending: PendingRequest<Body, Data> = PendingRequest.create({

            // eslint-disable-next-line @typescript-eslint/require-await
            response: (async (): Promise<IResponseConfig<Data>> => {

                const data: Data = generator.generate();
                return {
                    data,
                    status: 200,
                    statusText: 'OK',
                    headers: {},
                };
            })(),
            abort: () => undefined,
        });
        return pending;
    };

    return mockDriver;
};
