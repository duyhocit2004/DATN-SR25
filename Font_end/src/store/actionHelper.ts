import { reduxActions } from "@/store/reducers/reducer";

// export function dispatchAction(actionName: string, payload: any) {
//   const [sliceName, action] = actionName.split("/");
//   // Ép kiểu sliceName thành một trong các key của reduxActions
//   const typedSliceName = sliceName as keyof typeof reduxActions;
//   const sliceActions = reduxActions[typedSliceName];

//   // Ép kiểu action thành key của sliceActions
//   const typedAction = action as keyof typeof sliceActions;
//   if (sliceActions && sliceActions[typedAction]) {
//     return sliceActions[typedAction](payload);
//   }
//   throw new Error("Slice or action not found");
// }

export function dispatchAction(actionName: string, payload: any) {
  const [sliceName, action] = actionName.split("/");
  const sliceActions = reduxActions[sliceName]; // sliceName được coi là string vì kiểu của reduxActions cho phép index kiểu string
  if (sliceActions && sliceActions[action]) {
    return sliceActions[action](payload);
  }
  throw new Error("Slice or action not found");
}
