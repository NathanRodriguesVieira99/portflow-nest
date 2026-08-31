export interface UseCase<Input, Output> {
  execute: (input: Input, output: Output) => Promise<Output>;
}
