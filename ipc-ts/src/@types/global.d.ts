// 型のインポート
import MyAPI from "../myAPI";
// global の名前空間にある定義を上書き
declare global {
  interface Window {
    myAPI: MyAPI;
  }
}
