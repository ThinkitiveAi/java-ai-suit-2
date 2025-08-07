import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Alert,
  Chip,
  Divider,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Block,
  AccessTime,
  Event,
} from "@mui/icons-material";
import { format } from "date-fns";

const BlockDays = ({ blockedDays, onAddBlock, onEditBlock, onDeleteBlock }) => {
  const getBlockStatus = (block) => {
    const now = new Date();
    const blockDate = new Date(block.date);

    if (blockDate < now) {
      return { status: "Past", color: "default" };
    } else if (blockDate.toDateString() === now.toDateString()) {
      return { status: "Today", color: "warning" };
    } else {
      return { status: "Upcoming", color: "info" };
    }
  };

  const sortedBlockedDays = [...blockedDays].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6">Block Days</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={onAddBlock}>
          Add Block Days
        </Button>
      </Box>

      {blockedDays.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No blocked days configured. Add blocked days to prevent appointments
          during specific times.
        </Alert>
      ) : (
        <List>
          {sortedBlockedDays.map((block, index) => {
            const blockStatus = getBlockStatus(block);

            return (
              <React.Fragment key={block.id}>
                <ListItem
                  sx={{
                    border: "1px solid #ffcdd2",
                    borderRadius: "8px",
                    mb: 1,
                    backgroundColor: "#ffebee",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <Event fontSize="small" />
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: "medium" }}
                        >
                          {format(block.date, "MMM dd, yyyy")}
                        </Typography>
                        <Chip
                          label={blockStatus.status}
                          color={blockStatus.color}
                          size="small"
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 0.5,
                          }}
                        >
                          <AccessTime fontSize="small" />
                          <Typography variant="body2" color="text.secondary">
                            {block.startTime} - {block.endTime}
                          </Typography>
                        </Box>
                        {block.reason && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mt: 0.5,
                            }}
                          >
                            <Block fontSize="small" />
                            <Typography variant="body2" color="text.secondary">
                              {block.reason}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      size="small"
                      onClick={() => onEditBlock(block)}
                      sx={{ mr: 1 }}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onDeleteBlock(block.id)}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < sortedBlockedDays.length - 1 && (
                  <Divider sx={{ my: 1 }} />
                )}
              </React.Fragment>
            );
          })}
        </List>
      )}

      {blockedDays.length > 0 && (
        <Box
          sx={{ mt: 3, p: 2, backgroundColor: "#f8f9fa", borderRadius: "8px" }}
        >
          <Typography variant="body2" color="text.secondary">
            <strong>Total Blocked Days:</strong> {blockedDays.length}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Blocked days prevent any appointments from being scheduled during
            the specified time periods.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default BlockDays;
