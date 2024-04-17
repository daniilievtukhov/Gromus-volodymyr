import { Greeting as _Greeting } from "./components/Greeting";
import { GreetingAside } from "./components/GreetingAside";

export { useGreetingStore } from "./store";

export const Greeting = Object.assign(_Greeting, { Aside: GreetingAside });
