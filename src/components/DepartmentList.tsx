import React, { useState } from "react";
import {
  Box,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface SubDepartment {
  name: string;
}

interface Department {
  name: string;
  subDepartments: SubDepartment[];
}

const departments: Department[] = [
  {
    name: "Agriculture & Fishing",
    subDepartments: [
      { name: "Agriculture" },
      { name: "Crops" },
      { name: "Farming Animals & Livestock" },
      { name: "Fishery & Aquaculture" },
      { name: "Ranching" },
    ],
  },
  {
    name: "Business Services",
    subDepartments: [
      { name: "Accounting & Accounting Services" },
      { name: "Auctions" },
      { name: "Business Services - General" },
      { name: "Call Centers & Business Centers" },
      { name: "Career Planning" },
      { name: "Career" },
      { name: "Commercial Printing" },
      { name: "Debt Collection" },
    ],
  },
];

const DepartmentList = () => {
  const [open, setOpen] = useState<string | null>(null);
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (name: string) => {
    setOpen(open === name ? null : name);
  };

  const handleSelect = (name: string, isSub: boolean) => {
    if (isSub) {
      setSelected((prev) => ({ ...prev, [name]: !prev[name] }));
    } else {
      const newState = !selected[name];
      const updatedSelection = { ...selected, [name]: newState };
      departments
        .find((department) => department.name === name)
        ?.subDepartments.forEach((sub) => {
          updatedSelection[sub.name] = newState;
        });
      setSelected(updatedSelection);
    }
  };

  return (
    <List>
      {departments.map((department) => (
        <React.Fragment key={department.name}>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                checked={department.subDepartments.every(
                  (sub) => selected[sub.name]
                )}
                indeterminate={
                  department.subDepartments.some((sub) => selected[sub.name]) &&
                  !department.subDepartments.every((sub) => selected[sub.name])
                }
                onChange={() => handleSelect(department.name, false)}
              />
            </ListItemIcon>
            <ListItemText primary={department.name} />
            <IconButton onClick={() => handleToggle(department.name)}>
              {open === department.name ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItem>
          <Collapse in={open === department.name} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.subDepartments.map((sub) => (
                <ListItem key={sub.name} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Checkbox
                      checked={selected[sub.name] || false}
                      onChange={() => handleSelect(sub.name, true)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={sub.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default DepartmentList;
