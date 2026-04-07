import React, { useState } from 'react'
import {
  Box,
  Typography,
  Divider,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Chip,
  MenuList,
} from '@mui/material'
import {
  ContentCopy as CopyIcon,
  ContentCut as CutIcon,
  ContentPaste as PasteIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
} from '@mui/icons-material'

const menuGroups = [
  {
    label: '편집',
    items: [
      { label: '복사', icon: <CopyIcon fontSize="small" />, shortcut: 'Ctrl+C' },
      { label: '잘라내기', icon: <CutIcon fontSize="small" />, shortcut: 'Ctrl+X' },
      { label: '붙여넣기', icon: <PasteIcon fontSize="small" />, shortcut: 'Ctrl+V' },
    ],
  },
  {
    label: '파일',
    items: [
      { label: '편집', icon: <EditIcon fontSize="small" />, shortcut: 'Ctrl+E' },
      { label: '공유', icon: <ShareIcon fontSize="small" />, shortcut: '' },
      { label: '다운로드', icon: <DownloadIcon fontSize="small" />, shortcut: '' },
      { label: '삭제', icon: <DeleteIcon fontSize="small" color="error" />, shortcut: 'Del', color: 'error.main' },
    ],
  },
]

const Section13 = () => {
  const [anchors, setAnchors] = useState({ 편집: null, 파일: null })
  const [selected, setSelected] = useState(null)

  const handleOpen = (group) => (e) => {
    setAnchors((prev) => ({ ...prev, [group]: e.currentTarget }))
  }

  const handleClose = (group) => {
    setAnchors((prev) => ({ ...prev, [group]: null }))
  }

  const handleSelect = (group, label) => {
    setSelected({ group, label })
    handleClose(group)
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
        Section 13 — Menu
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        {menuGroups.map((group) => (
          <React.Fragment key={group.label}>
            <Button
              variant="contained"
              onClick={handleOpen(group.label)}
              aria-controls={anchors[group.label] ? `menu-${group.label}` : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(anchors[group.label])}
            >
              {group.label} 메뉴
            </Button>

            <Menu
              id={`menu-${group.label}`}
              anchorEl={anchors[group.label]}
              open={Boolean(anchors[group.label])}
              onClose={() => handleClose(group.label)}
              slotProps={{
                paper: { elevation: 3, sx: { minWidth: 200 } },
              }}
            >
              <MenuList dense disablePadding>
                {group.items.map((item, idx) => (
                  <MenuItem
                    key={item.label}
                    onClick={() => handleSelect(group.label, item.label)}
                    divider={idx === group.items.length - 2 && item.color === undefined}
                    sx={{ py: 1 }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          sx={{ color: item.color ?? 'text.primary' }}
                        >
                          {item.label}
                        </Typography>
                      }
                    />
                    {item.shortcut && (
                      <Typography variant="caption" sx={{ color: 'text.disabled', ml: 2 }}>
                        {item.shortcut}
                      </Typography>
                    )}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </React.Fragment>
        ))}
      </Box>

      <Paper variant="outlined" sx={{ p: 2, backgroundColor: 'grey.50' }}>
        <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
          선택된 메뉴
        </Typography>
        {selected ? (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Chip label={selected.group} size="small" variant="outlined" />
            <Typography variant="body2">→</Typography>
            <Chip
              label={selected.label}
              size="small"
              color="primary"
            />
          </Box>
        ) : (
          <Typography variant="body2" sx={{ color: '#bbb' }}>
            (없음)
          </Typography>
        )}
      </Paper>
    </Box>
  )
}

export default Section13
