import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { useTranslations, useModulesManager, Table } from "@openimis/fe-core";

const styles = (theme) => ({
  paper: theme.paper.paper,
});

const ClaimSummaryPanel = ({
  classes,
  totalItems = 0,
  totalServices = 0,
  totalClaimed = 0,
  totalApproved = 0,
  showApproved = false,
}) => {
  const modulesManager = useModulesManager();
  const { formatMessage, formatAmount } = useTranslations("claim", modulesManager);

  const header = formatMessage("ClaimSummary");

  const items = [
    {
      totalItems,
      totalServices,
      totalClaimed,
      totalApproved: showApproved ? totalApproved : undefined,
    },
  ];

  const headers = [
    "totalItems",
    "totalServices",
    "totalClaimed",
  ];

  if (showApproved) headers.push("totalApproved");

  const itemFormatters = [
    (row) => formatAmount(row.totalItems),
    (row) => formatAmount(row.totalServices),
    (row) => formatAmount(row.totalClaimed),
  ];

  if (showApproved) {
    itemFormatters.push((row) => formatAmount(row.totalApproved));
  }

  return (
    <Paper className={classes.paper}>
      <Table
        module="claim"
        header={header}
        headers={headers}
        items={items}
        itemFormatters={itemFormatters}
        showOrdinalNumber={false}
      />
    </Paper>
  );
};

export default withTheme(withStyles(styles)(ClaimSummaryPanel));
