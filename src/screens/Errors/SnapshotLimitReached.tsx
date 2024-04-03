import React from "react";

import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { Screen } from "../../components/Screen";
import { Stack } from "../../components/Stack";
import { Text } from "../../components/Text";

export const SnapshotLimitReached = ({
  children,
  billingUrl,
}: {
  children?: React.ReactNode;
  billingUrl?: string | null;
}) => {
  return (
    <Screen footer={null}>
      <Container>
        <Stack>
          <div>
            <Heading>Snapshot limit reached</Heading>
            <Text center muted>
              Your account has reached its monthly snapshot limit. Visual testing is disabled.
              Upgrade your plan to increase your quota.
            </Text>
          </div>

          {billingUrl && (
            <Button asChild size="medium" variant="solid">
              <a href={billingUrl} target="_new">
                Upgrade plan
              </a>
            </Button>
          )}

          {children}
        </Stack>
      </Container>
    </Screen>
  );
};
