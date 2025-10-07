import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import { Paper, Table, TableBody, TableCell, TableRow, Typography, Box } from "@material-ui/core";
import { useTranslations, useModulesManager } from "@openimis/fe-core";

const styles = (theme) => ({
  paper: {
    ...theme.paper.paper,
    marginTop: theme.spacing(2),
  },
  header: {
    padding: theme.spacing(1),
    backgroundColor: theme.paper.header.backgroundColor,
  },
  table: {
    minWidth: 300,
    '& .MuiTableCell-root': {
      borderBottom: 'none',
      padding: theme.spacing(1, 2),
    },
  },
  divider: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: theme.spacing(1, 0),
  },
  totalLabel: {
    fontSize: '1.1rem',
    fontWeight: 500,
  },
  totalValue: {
    textAlign: 'right',
    fontSize: '1.1rem',
    fontWeight: 500,
  },
  approvedRow: {
    backgroundColor: theme.palette.action.hover,
  },
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

  return (
    <Paper className={classes.paper}>
        <Box display="flex" justifyContent="space-between" alignItems="center" className={classes.header}>
        <Typography variant="h6">
            {formatMessage("ClaimSummary")}
        </Typography>
        </Box>
      <Table className={classes.table} size="small">
        <TableBody>
          <TableRow>
            <TableCell className={classes.totalLabel}>
              {formatMessage("totalServices")}:
            </TableCell>
            <TableCell className={classes.totalValue}>
              {formatAmount(totalServices)}
            </TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell className={classes.totalLabel}>
              {formatMessage("totalItems")}:
            </TableCell>
            <TableCell className={classes.totalValue}>
              {formatAmount(totalItems)}
            </TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell className={classes.totalLabel}>
              <strong>{formatMessage("totalClaimed")}:</strong>
            </TableCell>
            <TableCell className={classes.totalValue}>
              <strong>{formatAmount(totalClaimed)}</strong>
            </TableCell>
          </TableRow>

          {showApproved && (
            <>
              <TableRow>
                <TableCell colSpan={2} className={classes.divider} />
              </TableRow>
              <TableRow className={classes.approvedRow}>
                <TableCell className={classes.totalLabel}>
                  <strong>{formatMessage("totalApproved")}:</strong>
                </TableCell>
                <TableCell className={classes.totalValue}>
                  <strong>{formatAmount(totalApproved)}</strong>
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default withTheme(withStyles(styles)(ClaimSummaryPanel));