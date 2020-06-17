// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export var StandardNodeWidth = 300;
export var StandardSectionHeight = 30;
export var HeaderHeight = StandardSectionHeight;
export var InitNodeSize = {
  width: StandardNodeWidth,
  height: StandardSectionHeight * 2,
};
export var DiamondSize = {
  width: 30,
  height: 12,
};
export var LoopIconSize = {
  width: 16,
  height: 16,
};
export var IconBrickSize = {
  width: 24,
  height: 24,
};
export var LoopEdgeMarginLeft = 20;
export var BoxMargin = 5;
export var TriggerSize = InitNodeSize;
export var TerminatorSize = { width: 16, height: 16 };
export var ChoiceInputSize = {
  width: 155,
  height: 22,
};
export var ChoiceInputMarginTop = 8;
export var ChoiceInputMarginBottom = 10;
export var PropertyAssignmentSize = {
  width: 155,
  height: 16,
};
export var AssignmentMarginTop = 8;
export var AssignmentMarginBottom = 8;
export var EventNodeSize = {
  width: 240,
  height: 125,
};
export var CollapsedEventNodeSize = {
  width: 180,
  height: 4,
};
export var ElementInterval = {
  x: 50,
  y: 60,
};
export var BranchIntervalX = ElementInterval.x;
export var BranchIntervalY = ElementInterval.y / 2;
// Preserve enough space for condition label text on edges.
export var BranchAxisXIntervalMin = 150;
export var EdgeAddButtonSize = {
  width: 16,
  height: 16,
};
export var EventNodeLayout = {
  marginX: 12,
  marginY: 12,
};
export var PanelSize = {
  minWidth: (EventNodeSize.width + EventNodeLayout.marginX) * 2 + 24 * 2,
  maxWidth: (EventNodeSize.width + EventNodeLayout.marginX) * 4 + 24 * 2,
  defaultWidth: (EventNodeSize.width + EventNodeLayout.marginX) * 3 + 24 * 2,
  maxHeight: (EventNodeSize.height + EventNodeLayout.marginY) * 3 + 44 + 24 + 12 + 2,
};
//# sourceMappingURL=ElementSizes.js.map
