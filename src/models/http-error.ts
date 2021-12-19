class HttpError extends Error {
    constructor(message: string, private errorCode: number) {
        super(message);
        this.errorCode = errorCode;
    }
}

export default HttpError;