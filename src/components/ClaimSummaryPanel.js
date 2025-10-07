import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import { Paper, Typography, Grid } from "@material-ui/core";
import { useIntl } from "react-intl";
import { formatAmount, Table } from "@openimis/fe-core";
import { useTranslations, useModulesManager } from "@openimis/fe-core";
const styles = (theme) => ({
    paper: theme.paper.paper,
});

// const styles = (theme) => ({
//   paper: theme.paper.paper,
//   header: {
//     padding: theme.spacing(2),
//     backgroundColor: theme.palette.primary.light,
//     color: theme.palette.primary.contrastText,
//     borderBottom: `1px solid ${theme.palette.divider}`,
//   },
//   content: {
//     padding: theme.spacing(2),
//   },
//   label: {
//     fontWeight: 500,
//     color: theme.palette.text.secondary,
//   },
//   value: {
//     fontWeight: "bold",
//     fontSize: "1.1rem",
//     color: theme.palette.text.primary,
//   },
//   approved: {
//     color: theme.palette.success.main,
//   },
//   claimed: {
//     color: theme.palette.primary.main,
//   },
// });

const ClaimSummaryPanel = ({
  classes,
  totalItems = 0,
  totalServices = 0,
  totalClaimed = 0,
  totalApproved = 0,
  showApproved = false,
}) => {
  const intl = useIntl();
  const modulesManager = useModulesManager();
  const { formatMessage, formatAmount } = useTranslations("claim", modulesManager);

  let header = formatMessage("ClaimSummary");

  let headers = [
    `totalItems`,
    `totalServices`,
    `totalClaimed`,
    `totalApproved`,
  ];
  
  let itemFormatters = [
    formatAmount(totalItems),
    formatAmount(totalServices),
    formatAmount(totalClaimed),
    formatAmount(totalApproved),
  ];
  return (
    <Paper className={classes.paper}>
        <Table
            module="claim"
            header={header}
            headers={headers}
            itemFormatters={itemFormatters}
        />
    </Paper>
    )   
};

export default withTheme(withStyles(styles)(ClaimSummaryPanel));
