/**
 * @author WMXPY
 * @namespace Mock
 * @description Driver
 */

import { IRequestConfig, IResponseConfig, PendingRequest, RequestDriver } from "@barktler/driver";
import { Generator } from "@sudoo/generator";

export type MockDriverOptions = {

    readonly mockResponseData: boolean;
};

export const createMockDriver = (options: Partial<MockDriverOptions> = {}): RequestDriver => {

    const mergedOptions: MockDriverOptions = {

        mockResponseData: false,
        ...options,
    };

    const mockDriver: RequestDriver = <Body extends any = any, Data extends any = any>(request: IRequestConfig<Body>): PendingRequest<Body, Data> => {

        const pending: PendingRequest<Body, Data> = PendingRequest.create({

            response: (async (): Promise<IResponseConfig<Data>> => {

                if (mergedOptions.mockResponseData) {

                    if (!request.responseDataPattern) {

                        throw new Error('[Barktler] Response data pattern not declared');
                    }

                    const generator: Generator = Generator.create(request.responseDataPattern);
                    const data: Data = generator.generate();
                    return Promise.resolve({

                        succeed: true,
                        data,
                        status: 200,
                        statusText: 'OK',
                        headers: {},
                    });
                }

                return Promise.resolve({

                    succeed: true,
                    data: undefined as any,
                    status: 200,
                    statusText: 'OK',
                    headers: {},
                });
            })(),
            abort: () => undefined,
        });
        return pending;
    };
    return mockDriver;
};
