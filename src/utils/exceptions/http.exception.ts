class HttpException extends Error {
    /**
     * Request status
     */
    public status: number;

    /**
     * Set Message
     */
    public message: string;

    public constructor(
        status: number,
        message: string
    ) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export default HttpException;