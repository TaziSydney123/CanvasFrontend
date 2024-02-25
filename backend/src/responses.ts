import { StatusCodes } from 'http-status-codes';

export function successResponse(code: StatusCodes, message: string, data?: any) {
    return new Response(JSON.stringify({
        type: "success",
        message,
        data
    }), { status: code });
}

export function errorResponse(code: StatusCodes, message: string, data?: any): Response {
    return new Response(JSON.stringify({
        type: "error",
        message,
        data
    }), { status: code });
}