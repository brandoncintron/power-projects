import React from "react";
// JavaScript and TypeScript
import JavaScriptOriginalIcon from "react-devicons/javascript/original";
import TypeScriptOriginalIcon from "react-devicons/typescript/original";

// Backend languages
import PythonOriginalIcon from "react-devicons/python/original";
import CsharpOriginalIcon from "react-devicons/csharp/original";
import CplusplusOriginalIcon from "react-devicons/cplusplus/original";
import COriginalIcon from "react-devicons/c/original";
import PhpOriginalIcon from "react-devicons/php/original";
import RubyOriginalIcon from "react-devicons/ruby/original";
import GoOriginalIcon from "react-devicons/go/original";
import RustOriginalIcon from "react-devicons/rust/original";
import JavaOriginalIcon from "react-devicons/java/original";
import KotlinOriginalIcon from "react-devicons/kotlin/original";
import SwiftOriginalIcon from "react-devicons/swift/original";
import ErlangOriginalIcon from "react-devicons/erlang/original";
import ElixirOriginalIcon from "react-devicons/elixir/original";
import ScalaOriginalIcon from "react-devicons/scala/original";
import DartOriginalIcon from "react-devicons/dart/original";
import ClojureOriginalIcon from "react-devicons/clojure/original";
import HaskellOriginalIcon from "react-devicons/haskell/original";

// Frontend languages and frameworks
import HtmlOriginalIcon from "react-devicons/html5/original";
import CssOriginalIcon from "react-devicons/css3/original";
import SassOriginalIcon from "react-devicons/sass/original";
import ReactOriginalIcon from "react-devicons/react/original";
import AngularjsOriginalIcon from "react-devicons/angularjs/original";
import VueOriginalIcon from "react-devicons/vuejs/original";
import SvelteOriginalIcon from "react-devicons/svelte/original";
import DjangoOriginalIcon from "react-devicons/django/plain";
import FlaskOriginalIcon from "react-devicons/flask/original";
import FastAPIIcon from "react-devicons/fastapi/original";
import QtOriginalIcon from "react-devicons/qt/original";
import SpringOriginalIcon from "react-devicons/spring/original";
import NextjsOriginalIcon from "react-devicons/nextjs/original";
import ExpressOriginalIcon from "react-devicons/express/original";
import WordpressOriginalIcon from "react-devicons/wordpress/original";
import TensorflowOriginalIcon from "react-devicons/tensorflow/original";
import OpencvOriginalIcon from "react-devicons/opencv/original";
import PytorchOriginalIcon from "react-devicons/pytorch/original";
import ArduinoOriginalIcon from "react-devicons/arduino/original";
import RaspberrypiOriginalIcon from "react-devicons/raspberrypi/original";
import ElectronOriginalIcon from "react-devicons/electron/original";
import DotNetOriginalIcon from "react-devicons/dot-net/original";
import FlutterOriginalIcon from "react-devicons/flutter/original";

// Shell and scripting
import BashOriginalIcon from "react-devicons/bash/original";
import PowershellOriginalIcon from "react-devicons/powershell/original";
import PerlOriginalIcon from "react-devicons/perl/original";
import LuaOriginalIcon from "react-devicons/lua/original";

// Database icons
import MysqlOriginalIcon from "react-devicons/mysql/original";
import PostgresqlOriginalIcon from "react-devicons/postgresql/original";
import MongodbOriginalIcon from "react-devicons/mongodb/original";
import RedisOriginalIcon from "react-devicons/redis/original";
import SqliteOriginalIcon from "react-devicons/sqlite/original";
import FirebaseOriginalIcon from "react-devicons/firebase/original";

/**
 * Returns the language icon component for the specified language
 * @param language - Programming language name
 * @returns React component for the language icon
 */
export const getLanguageIcon = (language: string) => {
  switch(language.toLowerCase()) {
    // JavaScript and TypeScript
    case "javascript":
      return <JavaScriptOriginalIcon className="h-4 w-4" />;
    case "typescript":
      return <TypeScriptOriginalIcon className="h-4 w-4" />;
      
    // Backend languages
    case "python":
      return <PythonOriginalIcon className="h-4 w-4" />;
    case "c#":
      return <CsharpOriginalIcon className="h-4 w-4" />;
    case "c++":
    case "c/c++":
      return <CplusplusOriginalIcon className="h-4 w-4" />;
    case "c":
      return <COriginalIcon className="h-4 w-4" />;
    case "php":
      return <PhpOriginalIcon className="h-4 w-4" />;
    case "ruby":
      return <RubyOriginalIcon className="h-4 w-4" />;
    case "go":
      return <GoOriginalIcon className="h-4 w-4" />;
    case "rust":
      return <RustOriginalIcon className="h-4 w-4" />;
    case "java":
      return <JavaOriginalIcon className="h-4 w-4" />;
    case "kotlin":
      return <KotlinOriginalIcon className="h-4 w-4" />;
    case "swift":
      return <SwiftOriginalIcon className="h-4 w-4" />;
    case "erlang":
      return <ErlangOriginalIcon className="h-4 w-4" />;
    case "elixir":
      return <ElixirOriginalIcon className="h-4 w-4" />;
    case "scala":
      return <ScalaOriginalIcon className="h-4 w-4" />;
    case "dart":
      return <DartOriginalIcon className="h-4 w-4" />;
    case "clojure":
      return <ClojureOriginalIcon className="h-4 w-4" />;
    case "haskell":
      return <HaskellOriginalIcon className="h-4 w-4" />;
      
    // Frontend languages
    case "html":
    case "html5":
      return <HtmlOriginalIcon className="h-4 w-4" />;
    case "css":
    case "css3":
      return <CssOriginalIcon className="h-4 w-4" />;
    case "sass":
      return <SassOriginalIcon className="h-4 w-4" />;
    
    // Frontend frameworks
    case "react":
      return <ReactOriginalIcon className="h-4 w-4" />;
    case "angular":
    case "angularjs":
      return <AngularjsOriginalIcon className="h-4 w-4" />;
    case "vue":
    case "vue.js":
    case "vuejs":
      return <VueOriginalIcon className="h-4 w-4" />;
    case "svelte":
      return <SvelteOriginalIcon className="h-4 w-4" />;
    
    // Shell and scripting
    case "bash":
    case "shell":
      return <BashOriginalIcon className="h-4 w-4" />;
    case "powershell":
      return <PowershellOriginalIcon className="h-4 w-4" />;
    case "perl":
      return <PerlOriginalIcon className="h-4 w-4" />;
    case "lua":
      return <LuaOriginalIcon className="h-4 w-4" />;
      
    // Framework specific icons
    case "django":
      return <DjangoOriginalIcon className="h-4 w-4" />;
    case "flask":
      return <FlaskOriginalIcon className="h-4 w-4" />;
    case "fastapi":
      return <FastAPIIcon className="h-4 w-4" />;
    case "tkinter":
      return <PythonOriginalIcon className="h-4 w-4 text-blue-500" />;
    case "qt":
      return <QtOriginalIcon className="h-4 w-4" />;
    case "kotlin multiplatform":
      return <KotlinOriginalIcon className="h-4 w-4 text-purple-500" />;
    case "micropython":
      return <PythonOriginalIcon className="h-4 w-4 text-yellow-500" />;
    case "express.js":
      return <ExpressOriginalIcon className="h-4 w-4" />;
    case "tensorflow":
      return <TensorflowOriginalIcon className="h-4 w-4" />;
    case "opencv":
      return <OpencvOriginalIcon className="h-4 w-4" />;
    case "pytorch":
      return <PytorchOriginalIcon className="h-4 w-4" />;
    case "arduino":
      return <ArduinoOriginalIcon className="h-4 w-4" />;
    case "raspberry pi":
      return <RaspberrypiOriginalIcon className="h-4 w-4" />;
    case "electron":
      return <ElectronOriginalIcon className="h-4 w-4" />;
    case ".net":
      return <DotNetOriginalIcon className="h-4 w-4" />;
    case "flutter":
      return <FlutterOriginalIcon className="h-4 w-4" />;
      
    // Special cases
    case "visual basic":
      return <CsharpOriginalIcon className="h-4 w-4 text-blue-700" />;
    case "f#":
      return <CsharpOriginalIcon className="h-4 w-4 text-purple-600" />;
    case "various":
      return (
        <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" />
        </svg>
      );

    default:
      return (
        <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 18l2-2-2-2" />
          <path d="M8 6l-2 2 2 2" />
          <path d="M14.5 4l-5 16" />
        </svg>
      );
  }
};

/**
 * Returns the framework icon component for the specified framework
 * Falls back to the primary language icon if the framework doesn't have a dedicated icon
 * @param framework - Framework name
 * @param primaryLanguage - Primary language of the framework (optional)
 * @returns React component for the framework icon
 */
export const getFrameworkIcon = (framework: string, primaryLanguage?: string) => {
  const frameworkLower = framework.toLowerCase();
  
  // First try to find a dedicated framework icon
  switch(frameworkLower) {
    case "react":
    case "react native":
      return <ReactOriginalIcon className="h-4 w-4" />;
    case "angular":
    case "angularjs":
      return <AngularjsOriginalIcon className="h-4 w-4" />;
    case "vue.js":
    case "vuejs":
    case "vue":
      return <VueOriginalIcon className="h-4 w-4" />;
    case "django":
      return <DjangoOriginalIcon className="h-4 w-4" />;
    case "flask":
      return <FlaskOriginalIcon className="h-4 w-4" />;
    case "fastapi":
      return <FastAPIIcon className="h-4 w-4" />;
    case "svelte":
      return <SvelteOriginalIcon className="h-4 w-4" />;
    case "qt":
      return <QtOriginalIcon className="h-4 w-4" />;
    case "next.js":
      return <NextjsOriginalIcon className="h-4 w-4" />;
    case "express.js":
      return <ExpressOriginalIcon className="h-4 w-4" />;
    case "woocommerce":
      return <WordpressOriginalIcon className="h-4 w-4 text-purple-500" />;
    case "wordpress":
      return <WordpressOriginalIcon className="h-4 w-4" />;
    case "strapi":
      return <JavaScriptOriginalIcon className="h-4 w-4 text-purple-600" />;
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
    case "electron":
      return <ElectronOriginalIcon className="h-4 w-4" />;
    case ".net":
      return <DotNetOriginalIcon className="h-4 w-4" />;
    case "flutter":
      return <FlutterOriginalIcon className="h-4 w-4" />;
    case "ruby on rails":
    case "rails":
      return <RubyOriginalIcon className="h-4 w-4" />;
    case "kotlin multiplatform":
      return <KotlinOriginalIcon className="h-4 w-4 text-purple-500" />;
    case "micropython":
      return <PythonOriginalIcon className="h-4 w-4 text-yellow-500" />;
    case "tkinter":
      return <PythonOriginalIcon className="h-4 w-4 text-blue-500" />;
    case "spring boot":
      return <SpringOriginalIcon className="h-4 w-4" />;
      
    // Check for language/framework name matches
    case "python":
      return <PythonOriginalIcon className="h-4 w-4" />;
    case "javascript":
      return <JavaScriptOriginalIcon className="h-4 w-4" />;
    case "typescript":
      return <TypeScriptOriginalIcon className="h-4 w-4" />;
    case "ruby":
      return <RubyOriginalIcon className="h-4 w-4" />;
    case "go":
      return <GoOriginalIcon className="h-4 w-4" />;
    case "rust":
      return <RustOriginalIcon className="h-4 w-4" />;
    case "java":
      return <JavaOriginalIcon className="h-4 w-4" />;
    case "kotlin":
      return <KotlinOriginalIcon className="h-4 w-4" />;
    case "swift":
      return <SwiftOriginalIcon className="h-4 w-4" />;
    case "c":
      return <COriginalIcon className="h-4 w-4" />;
    case "c++":
    case "c/c++":
      return <CplusplusOriginalIcon className="h-4 w-4" />;
    case "c#":
      return <CsharpOriginalIcon className="h-4 w-4" />;
    case "php":
      return <PhpOriginalIcon className="h-4 w-4" />;
    case "bash":
    case "shell":
      return <BashOriginalIcon className="h-4 w-4" />;
    case "powershell":
      return <PowershellOriginalIcon className="h-4 w-4" />;
    
    // If no dedicated framework icon, fall back to the primary language icon
    default:
      if (primaryLanguage) {
        return getLanguageIcon(primaryLanguage);
      }
      
      // Default fallback icon
      return (
        <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v6M12 22v-6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M22 12h-6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" />
        </svg>
      );
  }
};

/**
 * Returns the database icon component for the specified database
 * @param database - Database name
 * @returns React component for the database icon
 */
export const getDatabaseIcon = (database: string) => {
  const databaseLower = database.toLowerCase();
  
  switch(databaseLower) {
    case "postgresql":
      return <PostgresqlOriginalIcon className="h-4 w-4" />;
    case "mysql":
      return <MysqlOriginalIcon className="h-4 w-4" />;
    case "mongodb":
      return <MongodbOriginalIcon className="h-4 w-4" />;
    case "sqlite":
      return <SqliteOriginalIcon className="h-4 w-4" />;
    case "redis":
      return <RedisOriginalIcon className="h-4 w-4" />;
    case "firebase":
      return <FirebaseOriginalIcon className="h-4 w-4" />;
    case "sql server":
      return (
        <svg className="h-4 w-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.7 15h-.2v-.2c0-.2-.2-.4-.4-.4h-.4c-.2 0-.4.2-.4.4v.2h-.2c-.2 0-.4.2-.4.4 0 .2.2.4.4.4h.2v.2c0 .2.2.4.4.4h.4c.2 0 .4-.2.4-.4v-.2h.2c.2 0 .4-.2.4-.4 0-.2-.2-.4-.4-.4Zm17.9-5.6c-.1-.1-.1-.2-.2-.3-.3-.2-.6-.5-.8-.7-.2-.1-.3-.3-.5-.4-.1 0-.1-.1-.2-.1-1-.8-2.2-1.4-3.6-1.8-.1 0-.1 0-.2-.1h-.1c-.1 0-.2-.1-.3-.1h-.1c-1.5-.3-3.2-.5-5.1-.5h-.4c-9.2.3-16.4 3.2-16.1 6.4l.3 2.7c.3 3.2 7.8 5.6 17 5.3.5 0 .9 0 1.4-.1h.1c.6 0 1.2-.1 1.8-.2s1.2-.2 1.8-.2c.5-.1.9-.2 1.4-.3.3-.1.5-.1.8-.2h.1c.2 0 .3-.1.5-.1h.1c.1 0 .2-.1.3-.1h.1c.7-.2 1.4-.5 2.1-.8.3-.1.5-.3.8-.4.1-.1.2-.1.3-.2.1-.1.2-.1.3-.2.5-.3.9-.7 1.3-1 .2-.2.3-.4.5-.6.1-.1.1-.2.2-.3v-.1c.1-.2.2-.4.3-.7 0-.1 0-.1.1-.2v-.1-.5-.2-.1c-.1-.4-.2-.7-.5-1Zm-17.3 7.8c-3.2 0-5.8-.8-5.8-1.7s2.6-1.7 5.8-1.7 5.8.8 5.8 1.7-2.6 1.7-5.8 1.7Zm15.9-4.1c-.1 1.3-1.5 2.4-3.5 3.4-2.4 1.1-5.6 1.8-9.1 1.8-3.2 0-6.2-.5-8.4-1.5-2.2-.9-3.5-2.2-3.5-3.5v-1.3c1.1 1.2 3.1 2.2 5.8 2.9 1.8.4 3.7.7 5.7.7 1.7 0 3.5-.2 5.1-.5 1.5-.4 2.8-.9 3.9-1.5 1.2-.7 1.8-1.5 1.9-2.4h.1v1.9Z" />
        </svg>
      );
    case "realm":
      return (
        <svg className="h-4 w-4 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.292 3.68a.275.275 0 0 0-.273.273v15.909c0 .15.123.272.273.272H21.71a.275.275 0 0 0 .273-.272V3.953a.275.275 0 0 0-.273-.273zm3.706 2.035v12.258h12.204V5.715zm1.667 1.66h8.964v1.92h-8.964zm0 3.17h3.413v5.657H7.665zm5.07 0h3.894v2.865h-3.893zm0 4.2h3.894v1.458h-3.893z" />
        </svg>
      );
    case "hdf5":
      return (
        <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 3h16c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V4c0-.6.4-1 1-1zm1 5h2.5v9H5V8zm4 0h2.5v9H9V8zm4 0h2.5v4H13v5h-2.5V8H13zm6 0v9h-2.5v-9H19z"/>
        </svg>
      );
    case "indexeddb":
      return (
        <svg className="h-4 w-4 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.5 22.5H4.5a3 3 0 01-3-3V4.5a3 3 0 013-3h15a3 3 0 013 3V19.5a3 3 0 01-3.001 3zM4.5 3a1.5 1.5 0 00-1.5 1.5V19.5A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5V4.5A1.5 1.5 0 0019.5 3z M16.5 7.5h-9v9h9z M9 13.5h6v-3H9z"/>
        </svg>
      );
    case "hive":
      return (
        <svg className="h-4 w-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.816 3l-3.788 6.7-3.8-6.7H3.11l5.023 8.9L3.11 21h3.118l3.8-6.7 3.788 6.7h3.118l-5.023-8.9L16.934 3h-3.118z"/>
        </svg>
      );
    default:
      // Default database icon
      return (
        <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect>
          <line x1="7" y1="7" x2="17" y2="7"></line>
          <line x1="7" y1="12" x2="17" y2="12"></line>
          <line x1="7" y1="17" x2="17" y2="17"></line>
        </svg>
      );
  }
}; 