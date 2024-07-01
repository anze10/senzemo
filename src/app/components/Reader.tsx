"use client"
import React, { useEffect, useState } from 'react';
import { Checkbox, Button, InputLabel, Input, FormControl, MenuItem } from '@mui/material';
import handleClick from './HandleClick';
import parseJsonString from './Parser';
import Select from '@mui/material/Select';

const SerialPortComponent: React.FC = () => {
    const [orderName, setOrderName] = useState<string>('');
    const [deviceType, setDeviceType] = useState<string>('');
    const [count, setCount] = useState<string>('');
    const [user, setUser] = useState<string>('');
    const [deviceEui, setDeviceEui] = useState<string>('');
    const [status, setStatus] = useState<number>(10);
    const [appEui, setAppEui] = useState<string>('');
    const [appKey, setAppKey] = useState<string>('');
    const [sendPeriod, setSendPeriod] = useState<string>('');
    const [ack, setAck] = useState<string>('');
    const [movThr, setMovThr] = useState<string>('');
    const [adcEnable, setAdcEnable] = useState<boolean>(false);
    const [adcDelay, setAdcDelay] = useState<string>('');
    const [companyName, setCompanyName] = useState<string>('');
    const [temperature, setTemperature] = useState<string>('');
    const [humidity, setHumidity] = useState<string>('');
    const [deviceTypeOptions, setDeviceTypeOptions] = useState<string[]>([]);
    const [dataRateOptions, setDataRateOptions] = useState<string[]>([]);
    const [frequencyRegionOptions, setFrequencyRegionOptions] = useState<string>("");
    const [hybridEnableOptions, setHybridEnableOptions] = useState<string[]>([]);
    const [hybridMaskOptions, setHybridMaskOptions] = useState<number>(0);

    const handleDataReceived = (data: string) => {
        const parsedData = parseJsonString(data);
        console.log(parsedData);
        console.log(parsedData.lora.freq_reg);

        setDeviceType(parsedData.deviceType || 'Senstic');
        setDeviceEui(parsedData.dev_eui || '');
        setStatus(parsedData.device?.status !== undefined ? parseInt(parsedData.device.status, 10) : 10);
        setAppEui(parsedData.join_eui || '');
        setAppKey(parsedData.app_key || '');
        setSendPeriod(parsedData.lora.send_period || '');
        setAck(parsedData.lora.ack || '');
        setMovThr(parsedData.device.mov_thr || '');
        setAdcEnable(parsedData.adcEnable || false);
        setAdcDelay(parsedData.device.adc_delay || '');
        setTemperature(parsedData.sensors.temp || '');
        setHumidity(parsedData.sensors.hum || '');
        setDeviceTypeOptions(parsedData.deviceTypeOptions || []);
        setDataRateOptions(parsedData.dataRateOptions || []);
        setFrequencyRegionOptions(parsedData.lora.freq_reg || "");
        setHybridEnableOptions(parsedData.hybridEnableOptions || []);
        setHybridMaskOptions(parsedData.lora.mask2_5 !== undefined ? parsedData.lora.mask2_5 : 0);
    };

    useEffect(() => {
        console.log("useEffect", status);
    }, [status]);

    const handleButtonClick = () => {
        handleClick(handleDataReceived);
    };

    const getStatusColor = (statu: number) => {
        console.log("tuki", statu);
        if (statu === 0) {
            return 'green';
        } else if (statu === 1 || statu === 2) {
            return 'yellow';
        } else if (statu > 2) {
            return 'red';
        } else {
            return 'bg-purple-200';
        }
    };

    return (
        <div style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <button onClick={handleButtonClick}>
                Open Serial Port
            </button>
            <div className="max-w-7xl mx-auto px-6 py-8 md:px-8 md:py-12">
                <h1 className="text-center text-3xl font-bold mb-8">SENZEMO</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                        <InputLabel htmlFor="order-name">Order Name</InputLabel>
                        <Input id="order-name" value={orderName} onChange={(e) => setOrderName(e.target.value)} placeholder="Order name will be auto-filled from NFC tag" />
                    </div>
                    <div>
                        <InputLabel htmlFor="device-type">Device Type</InputLabel>
                        <Input id="device-type" value={deviceType} onChange={(e) => setDeviceType(e.target.value)} placeholder="Device type will be auto-filled from NFC tag" />
                    </div>
                    <div>
                        <InputLabel htmlFor="count">Count</InputLabel>
                        <Input id="count" value={count} onChange={(e) => setCount(e.target.value)} placeholder="Count will be auto-filled from NFC tag" disabled />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                        <InputLabel htmlFor="user">User</InputLabel>
                        <Input id="user" value={user} onChange={(e) => setUser(e.target.value)} placeholder="User will be auto-filled from NFC tag" />
                    </div>
                    <div>
                        <InputLabel htmlFor="device-eui">Device EUI</InputLabel>
                        <Input id="device-eui" value={deviceEui} onChange={(e) => setDeviceEui(e.target.value)} placeholder="Device EUI will be auto-filled from NFC tag" disabled />
                    </div>
                </div>
                <div className="mb-8">
                    <InputLabel htmlFor="status">Status OK/NOT OK</InputLabel>
                    <Input
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(parseInt(e.target.value, 10))}
                        placeholder="Status will be auto-filled from NFC tag"
                        sx={{
                            backgroundColor: getStatusColor(status),
                            width: '100%',
                        }}
                        disabled
                    />
                </div>
                <div className="my-4">
                    <hr className="border-black border-2" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                        <InputLabel htmlFor="choose-device-type">Choose Device Type</InputLabel>
                        <FormControl fullWidth>
                            <Select
                                id="choose-device-type"
                                value={deviceType}
                                onChange={(e) => setDeviceType(e.target.value as string)}
                                displayEmpty
                            >
                                {deviceTypeOptions.map((option) => (
                                    <MenuItem key={option} value={option}>{option}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <InputLabel htmlFor="app-eui">App EUI</InputLabel>
                        <Input id="app-eui" value={appEui} onChange={(e) => setAppEui(e.target.value)} placeholder="App EUI will be auto-filled from NFC tag" disabled />
                    </div>
                    <div>
                        <InputLabel htmlFor="app-key">App Key</InputLabel>
                        <Input id="app-key" value={appKey} onChange={(e) => setAppKey(e.target.value)} placeholder="App key will be auto-filled from NFC tag" disabled />
                    </div>
                    <div>
                        <InputLabel htmlFor="data-rate">Data Rate</InputLabel>
                        <FormControl fullWidth>
                            <Select
                                id="data-rate"
                                value={''} // Replace with appropriate state
                                onChange={(e) => {/* set appropriate state */ }}
                                displayEmpty
                            >
                                {dataRateOptions.map((option) => (
                                    <MenuItem key={option} value={option}>{option}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <InputLabel htmlFor="frequency-region">Frequency Region</InputLabel>
                        <FormControl fullWidth>
                            <Select
                                id="frequency-region"
                                value={frequencyRegionOptions}
                                onChange={(e) => setFrequencyRegionOptions(e.target.value as string)}
                            >
                                <MenuItem value='AS923'>AS923</MenuItem>
                                <MenuItem value="x">2</MenuItem>
                                <MenuItem value="Y">3</MenuItem>
                                <MenuItem value="z">4</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <InputLabel htmlFor="hybrid-enable">Hybrid Enable + AS923 Offset + MA</InputLabel>
                        <FormControl fullWidth>
                            <Select
                                id="hybrid-enable"
                                value={''} // Replace with appropriate state
                                onChange={(e) => {/* set appropriate state */ }}
                                displayEmpty
                            >
                                {hybridEnableOptions.map((option) => (
                                    <MenuItem key={option} value={option}>{option}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <InputLabel htmlFor="hybrid-mask">Hybrid Mask 2-5</InputLabel>
                        <FormControl fullWidth>
                            <Select
                                id="hybrid-mask"
                                value={hybridMaskOptions} // Replace with appropriate state
                                //onChange={(e) => setHybridMaskOptions(parseInt(e.target.value, 10))}
                                displayEmpty
                            >
                                <MenuItem value="128">128</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                                <MenuItem value="4">4</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <InputLabel htmlFor="send-period">Send Period</InputLabel>
                        <Input id="send-period" value={sendPeriod} onChange={(e) => setSendPeriod(e.target.value)} placeholder="Send period will be auto-filled from NFC tag" disabled />
                    </div>
                    <div>
                        <InputLabel htmlFor="ack">Ack</InputLabel>
                        <Input id="ack" value={ack} onChange={(e) => setAck(e.target.value)} placeholder="Ack will be auto-filled from NFC tag" disabled />
                    </div>
                    <div>
                        <InputLabel htmlFor="mov-thr">Mov Thr</InputLabel>
                        <Input id="mov-thr" value={movThr} onChange={(e) => setMovThr(e.target.value)} placeholder="Mov thr will be auto-filled from NFC tag" />
                    </div>
                    <div>
                        <InputLabel htmlFor="adc-enable">ADC Enable</InputLabel>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="adc-enable" checked={adcEnable} onChange={(e) => setAdcEnable(e.target.checked)} />
                        </div>
                    </div>
                    <div>
                        <InputLabel htmlFor="adc-delay">ADC Delay</InputLabel>
                        <Input id="adc-delay" value={adcDelay} onChange={(e) => setAdcDelay(e.target.value)} placeholder="ADC delay will be auto-filled from NFC tag" disabled />
                    </div>
                    <div>
                        <InputLabel htmlFor="company-name">Enter Company Name</InputLabel>
                        <Input id="company-name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company name will be auto-filled from NFC tag" disabled />
                    </div>
                    <div>
                        <InputLabel htmlFor="temperature">Temperature</InputLabel>
                        <Input id="temperature" value={temperature} onChange={(e) => setTemperature(e.target.value)} placeholder="Temperature will be auto-filled from sensor" disabled />
                    </div>
                    <div>
                        <InputLabel htmlFor="humidity">Humidity</InputLabel>
                        <Input id="humidity" value={humidity} onChange={(e) => setHumidity(e.target.value)} placeholder="Humidity will be auto-filled from sensor" disabled />
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
