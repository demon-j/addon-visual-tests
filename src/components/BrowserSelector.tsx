import { TooltipNote, WithTooltip } from "@storybook/components";
import { styled } from "@storybook/theming";
import React, { ComponentProps } from "react";

import { Browser, BrowserInfo, ComparisonResult } from "../gql/graphql";
import { aggregateResult } from "../utils/aggregateResult";
import { ArrowIcon } from "./icons/ArrowIcon";
import { ChromeIcon } from "./icons/ChromeIcon";
import { EdgeIcon } from "./icons/EdgeIcon";
import { FirefoxIcon } from "./icons/FirefoxIcon";
import { SafariIcon } from "./icons/SafariIcon";
import { StatusDot, StatusDotWrapper } from "./StatusDot";
import { TooltipMenu } from "./TooltipMenu";

const browserIcons = {
  [Browser.Chrome]: <ChromeIcon alt="Chrome" aria-label="Chrome" />,
  [Browser.Firefox]: <FirefoxIcon alt="Firefox" aria-label="Firefox" />,
  [Browser.Safari]: <SafariIcon alt="Safari" aria-label="Safari" />,
  [Browser.Edge]: <EdgeIcon alt="Edge" aria-label="Edge" />,
} as const;

const IconWrapper = styled.div(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  height: 16,
  margin: "6px 7px",
  color: `${theme.color.defaultText}99`,
  svg: {
    verticalAlign: "top",
  },
}));

const Label = styled.span({
  display: "none",
  "@container (min-width: 300px)": {
    display: "inline-block",
  },
});

type BrowserData = Pick<BrowserInfo, "id" | "key" | "name">;

interface BrowserSelectorProps {
  isAccepted: boolean;
  selectedBrowser: BrowserData;
  browserResults: { browser: BrowserData; result?: ComparisonResult }[];
  onSelectBrowser: (browser: BrowserData) => void;
}

export const BrowserSelector = ({
  isAccepted,
  selectedBrowser,
  browserResults,
  onSelectBrowser,
}: BrowserSelectorProps) => {
  const aggregate = aggregateResult(browserResults.map(({ result }) => result));
  if (!aggregate) return null;

  let icon = browserIcons[selectedBrowser.key];
  if (!isAccepted && aggregate !== ComparisonResult.Equal) {
    icon = <StatusDotWrapper status={aggregate}>{icon}</StatusDotWrapper>;
  }

  type Link = ComponentProps<typeof TooltipMenu>["links"][0];

  const links =
    browserResults.length > 1 &&
    browserResults.map(
      ({ browser, result }): Link => ({
        active: selectedBrowser === browser,
        id: browser.id,
        onClick: () => onSelectBrowser(browser),
        right: !isAccepted && result !== ComparisonResult.Equal && <StatusDot status={result} />,
        icon: browserIcons[browser.key],
        title: browser.name,
      })
    );
  return (
    <WithTooltip
      key={selectedBrowser.key}
      hasChrome={false}
      placement="top"
      trigger="hover"
      tooltip={
        <TooltipNote
          note={links ? "Switch browser" : `Tested in ${browserResults[0].browser.name}`}
        />
      }
    >
      {links ? (
        <TooltipMenu placement="bottom" links={links}>
          {icon}
          <Label>{selectedBrowser.name}</Label>
          <ArrowIcon icon="arrowdown" />
        </TooltipMenu>
      ) : (
        <IconWrapper>
          {icon}
          <Label>{selectedBrowser.name}</Label>
        </IconWrapper>
      )}
    </WithTooltip>
  );
};
