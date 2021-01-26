export type PongFn = (msg: string) => void;
export type BroadcastFn = (msg: string) => void;
export default interface MyAPI {
  ping: () => void;
  pong: (fn: PongFn) => void;
  broadcast: (fn: BroadcastFn) => void;
}
