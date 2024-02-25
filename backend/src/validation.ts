import { ZodError, z } from "zod";
import { errorResponse } from "./responses";
import { StatusCodes } from "http-status-codes";

export function validate<T>(json: object, schema: z.Schema<T>): Response | T {
    try {
        return schema.parse(json);
    } catch (validationError) {
        if (validationError instanceof ZodError) {
            return errorResponse(StatusCodes.BAD_REQUEST, "Invalid Request", {
                data: validationError.errors.map(issue => issue.message)
            });
        }

        return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Unexpected Server Error");
    }
}