import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, Box } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { useTranslations, useModulesManager } from '@openimis/fe-core';

const styles = (theme) => ({
  toast: {
    position: 'fixed',
    bottom: theme.spacing(3),
    left: theme.spacing(0),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[6],
    borderRadius: theme.spacing(0),
    zIndex: 1400,
    minWidth: 250,
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    '&:hover': {
      boxShadow: theme.shadows[8],
    },
    transition: 'all 0.3s ease',
  },
  amountContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
  amountRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(0),
  },
  amountLabel: {
    color: theme.palette.text.secondary,
    fontWeight: 500,
  },
  amountValue: {
    fontWeight: 'bold',
    textAlign: 'right',
    minWidth: 100,
  },
  divider: {
    margin: theme.spacing(1, 0),
    borderTop: `1px solid ${theme.palette.divider}`,
  },
});

const FloatingTotalAmount = ({ 
  classes, 
  claimed = 0, 
  approved = 0, 
  showApproved = false 
}) => {
  if (claimed <= 0) return null;
  const intl = useIntl();
  const modulesManager = useModulesManager();
  const { formatMessage, formatAmount } = useTranslations("claim", modulesManager);

  return (
    <Paper className={classes.toast} elevation={3}>
      <Box className={classes.amountContainer}>
        <Box className={classes.amountRow}>
          <Typography variant="subtitle2" className={classes.amountLabel}>
            {formatMessage("claimedAmount")}
          </Typography>
          <Typography variant="subtitle1" className={classes.amountValue} color="primary">
            {formatAmount(claimed)}
          </Typography>
        </Box>
        
        {showApproved && approved > 0 && (
          <>
            <div className={classes.divider} />
            <Box className={classes.amountRow}>
              <Typography variant="subtitle2" className={classes.amountLabel}>
                {formatMessage("approvedAmount")}
              </Typography>
              <Typography variant="subtitle1" className={classes.amountValue} color="secondary">
                {formatAmount(approved)}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default (withStyles(styles)(FloatingTotalAmount));
