class AppError {
  public readonly status: number;
  public readonly message: string;
  public readonly time: Date;

  constructor(message: string, status = 404, time = new Date()) {
    this.status = status;
    this.message = message;
    this.time = time;
  }
}

export default AppError;
