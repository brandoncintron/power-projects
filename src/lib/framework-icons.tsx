import React from "react";
import ReactOriginalIcon from "react-devicons/react/original";
import NextjsOriginalIcon from "react-devicons/nextjs/original";
import ExpressOriginalIcon from "react-devicons/express/original";
import AngularOriginalIcon from "react-devicons/angularjs/original";
import WordpressOriginalIcon from "react-devicons/wordpress/original";
import TensorflowOriginalIcon from "react-devicons/tensorflow/original";
import OpencvOriginalIcon from "react-devicons/opencv/original";
import PytorchOriginalIcon from "react-devicons/pytorch/original";
import ArduinoOriginalIcon from "react-devicons/arduino/original";
import RaspberrypiOriginalIcon from "react-devicons/raspberrypi/original";
import PythonOriginalIcon from "react-devicons/python/original";
import BashOriginalIcon from "react-devicons/bash/original";
import JavascriptOriginalIcon from "react-devicons/javascript/original";
import PowershellOriginalIcon from "react-devicons/powershell/original";
import ElectronOriginalIcon from "react-devicons/electron/original";
import DotNetOriginalIcon from "react-devicons/dot-net/original";
import FlutterOriginalIcon from "react-devicons/flutter/original";

/**
 * Returns the appropriate framework icon component for a given framework
 * @param framework The framework name
 * @returns React component for the framework icon
 */
export const getFrameworkIcon = (framework: string) => {
  switch(framework.toLowerCase()) {
    case "next.js":
      return <NextjsOriginalIcon className="h-4 w-4" />;
    case "express.js":
      return <ExpressOriginalIcon className="h-4 w-4" />;
    case "woocommerce":
      return <WordpressOriginalIcon className="h-4 w-4 text-purple-500" />;
    case "react":
      return <ReactOriginalIcon className="h-4 w-4" />;
    case "angular":
      return <AngularOriginalIcon className="h-4 w-4" />;
    case "wordpress":
      return <WordpressOriginalIcon className="h-4 w-4" />;
    case "strapi":
      return <JavascriptOriginalIcon className="h-4 w-4 text-purple-600" />;
    case "tensorflow":
      return <TensorflowOriginalIcon className="h-4 w-4" />;
    case "opencv":
      return <OpencvOriginalIcon className="h-4 w-4" />;
    case "pytorch":
      return <PytorchOriginalIcon className="h-4 w-4" />;
    case "nltk":
      return <PythonOriginalIcon className="h-4 w-4 text-blue-500" />;
    case "arduino":
      return <ArduinoOriginalIcon className="h-4 w-4" />;
    case "home assistant":
      return <RaspberrypiOriginalIcon className="h-4 w-4 text-green-600" />;
    case "raspberry pi":
      return <RaspberrypiOriginalIcon className="h-4 w-4" />;
    case "esp32":
      return <ArduinoOriginalIcon className="h-4 w-4 text-blue-400" />;
    case "python":
      return <PythonOriginalIcon className="h-4 w-4" />;
    case "shell":
      return <BashOriginalIcon className="h-4 w-4" />;
    case "javascript":
      return <JavascriptOriginalIcon className="h-4 w-4" />;
    case "powershell":
      return <PowershellOriginalIcon className="h-4 w-4" />;
    case "electron":
      return <ElectronOriginalIcon className="h-4 w-4" />;
    case ".net":
      return <DotNetOriginalIcon className="h-4 w-4" />;
    case "react native":
      return <ReactOriginalIcon className="h-4 w-4 text-blue-400" />;
    case "flutter":
      return <FlutterOriginalIcon className="h-4 w-4" />;
    default:
      return null;
  }
}; 