import React from "react";

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
  [Browser.Chrome]: <ChromeIcon alt="Chrome" />,
  [Browser.Firefox]: <FirefoxIcon alt="Firefox" />,
  [Browser.Safari]: <SafariIcon alt="Safari" />,
  [Browser.Edge]: <EdgeIcon alt="Edge" />,
} as const;

type BrowserData = Pick<BrowserInfo, "id" | "key" | "name">;

interface BrowserSelectorProps {
  selectedBrowser: BrowserData;
  browserResults: { browser: BrowserData; result: ComparisonResult }[];
  onSelectBrowser: (browser: BrowserData) => void;
}

export const BrowserSelector = ({
  selectedBrowser,
  browserResults,
  onSelectBrowser,
}: BrowserSelectorProps) => {
  const links = browserResults
    .filter(({ browser }) => browser.key in browserIcons)
    .map(({ browser, result }) => ({
      active: selectedBrowser === browser,
      id: browser.id,
      onClick: () => onSelectBrowser(browser),
      right: result !== ComparisonResult.Equal && <StatusDot status={result} />,
      title: browser.name,
    }));

  const aggregate = aggregateResult(browserResults.map(({ result }) => result));
  if (!aggregate) return null;

  const icon = browserIcons[selectedBrowser.key];
  return (
    <TooltipMenu placement="bottom" links={links}>
      {aggregate === ComparisonResult.Equal ? (
        icon
      ) : (
        <StatusDotWrapper status={aggregate}>{icon}</StatusDotWrapper>
      )}
      <ArrowIcon icon="arrowdown" />
    </TooltipMenu>
  );
};
