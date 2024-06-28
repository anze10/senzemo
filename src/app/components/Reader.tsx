"use client";

import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Checkbox } from '@mui/material';
import { Button } from '@mui/material';
import handleClick from './HandleClick';
import parseJsonString from './Parser';
import { InputLabel } from '@mui/material';
import { Input } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const MultipleSelectPlaceholder: React.FC = () => {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
            <Select
                multiple
                displayEmpty
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return <em>Placeholder</em>;
                    }

                    return selected.join(', ');
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
            >
                <MenuItem disabled value="">
                    <em>Placeholder</em>
                </MenuItem>
                {names.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

const SerialPortComponent: React.FC = () => {
    const handleDataReceived = (data: string) => {
        console.log("Data received in callback:", data);
        const parsedData = parseJsonString(data);
        console.log("Parsed data:", parsedData);
    };

    const handleButtonClick = () => {
        handleClick(handleDataReceived);
    };

    return (
        <div>
            <button onClick={handleButtonClick}>
                Open Serial Port
            </button>
            <div className="max-w-7xl mx-auto px-6 py-8 md:px-8 md:py-12">
                <h1 className="text-center text-3xl font-bold mb-8">SENZEMO</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                        <InputLabel htmlFor="order-name">Order Name</InputLabel>
                        <Input id="order-name" placeholder="Order name will be auto-filled from NFC tag" />
                    </div>
                    <div>
                        <InputLabel htmlFor="device-type">Device Type</InputLabel>
                        <Input id="device-type" placeholder="Device type will be auto-filled from NFC tag" />
                    </div>
                    <div>
                        <InputLabel htmlFor="count">Count</InputLabel>
                        <Input id="count" placeholder="Count will be auto-filled from NFC tag" disabled />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                        <InputLabel htmlFor="user">User</InputLabel>
                        <Input id="user" placeholder="User will be auto-filled from NFC tag" />
                    </div>
                    <div>
                        <InputLabel htmlFor="device-eui">Device EUI</InputLabel>
                        <Input id="device-eui" placeholder="Device EUI will be auto-filled from NFC tag" disabled />
                    </div>
                </div>
                <div className="mb-8">
                    <InputLabel htmlFor="status">Status OK/NOT OK</InputLabel>
                    <Input id="status" placeholder="Status will be auto-filled from NFC tag" className="bg-green-200 w-full" disabled />
                </div>
                <div className="my-4">
                    <hr className="border-black border-2" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                        <InputLabel htmlFor="choose-device-type">Choose Device Type</InputLabel>
                        <MultipleSelectPlaceholder />
                    </div>
                    <div>
                        <InputLabel htmlFor="app-eui">App EUI</InputLabel>
                        <Input id="app-eui" placeholder="App EUI will be auto-filled from NFC tag" disabled />
                    </div>
                    <div>
                        <InputLabel htmlFor="app-key">App Key</InputLabel>
                        <Input id="app-key" placeholder="App key will be auto-filled from NFC tag" disabled />
                    </div>
                    <div>
                        <InputLabel htmlFor="data-rate">Data Rate</InputLabel>
                        <MultipleSelectPlaceholder />
                    </div>
                    <div>
                        <InputLabel htmlFor="frequency-region">Frequency Region</InputLabel>
                        <MultipleSelectPlaceholder />
                    </div>
                    <div>
                        <InputLabel htmlFor="hybrid-enable">Hybrid Enable + AS923 Offset + MA</InputLabel>
                        <MultipleSelectPlaceholder />
                    </div>
                    <div>
                        <InputLabel htmlFor="hybrid-mask">Hybrid Mask 2-5</InputLabel>
                        <MultipleSelectPlaceholder />
                    </div>
                    <div>
                        <InputLabel htmlFor="send-period">Send Period</InputLabel>
                        <Input id="send-period" placeholder="Send period will be auto-filled from NFC tag" disabled />
                    </div>
                    <div>
                        <InputLabel htmlFor="ack">Ack</InputLabel>
                        <Input id="ack" placeholder="Ack will be auto-filled from NFC tag" disabled />
                    </div>
                    <div>
                        <InputLabel htmlFor="mov-thr">Mov Thr</InputLabel>
                        <Input id="mov-thr" placeholder="Mov thr will be auto-filled from NFC tag" />
                    </div>
                    <div>
                        <InputLabel htmlFor="adc-enable">ADC Enable</InputLabel>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="adc-enable" disabled />
                        </div>
                    </div>
                    <div>
                        <InputLabel htmlFor="adc-delay">ADC Delay</InputLabel>
                        <Input id="adc-delay" placeholder="ADC delay will be auto-filled from NFC tag" disabled />
                    </div>
                    <div>
                        <InputLabel htmlFor="company-name">Enter Company Name</InputLabel>
                        <Input id="company-name" placeholder="Company name will be auto-filled from NFC tag" disabled />
                    </div>
                </div>
                <div className="flex justify-center gap-4">
                    <Button className="text-2xl">
                        Accept
                    </Button>
                    <Button className="text-2xl">
                        Not Acceptable
                    </Button>
                    <Button className="text-2xl">
                        Finish
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SerialPortComponent;
