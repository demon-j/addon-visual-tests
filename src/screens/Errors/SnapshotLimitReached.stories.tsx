import type { Meta, StoryObj } from "@storybook/react";

import { SnapshotLimitReached } from "./SnapshotLimitReached";

const meta = {
  component: SnapshotLimitReached,
  args: {
    billingUrl: "https://www.chromatic.com/billing?accountId=5af25af03c9f2c4bdccc0fcb",
  },
} satisfies Meta<typeof SnapshotLimitReached>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
