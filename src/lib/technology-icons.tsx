import React from "react";

import {
  AngularjsOriginal,
  BashOriginal,
  COriginal,
  CplusplusOriginal,
  CsharpOriginal,
  DartOriginal,
  DjangoPlain,
  DotNetOriginal,
  ElectronOriginal,
  ExpressOriginal,
  FastapiOriginal,
  FirebasePlain,
  FlaskOriginal,
  FlutterOriginal,
  JavaOriginal,
  JavascriptOriginal,
  KotlinOriginal,
  LaravelOriginal,
  LuaOriginal,
  MongodbOriginal,
  MysqlOriginal,
  NestjsOriginal,
  NextjsOriginal,
  NumpyOriginal,
  PandasOriginal,
  PhpOriginal,
  PostgresqlOriginal,
  PowershellOriginal,
  PythonOriginal,
  PytorchOriginal,
  QtOriginal,
  ReactOriginal,
  RedisOriginal,
  RubyOriginal,
  RustOriginal,
  ScikitlearnOriginal,
  SpringOriginal,
  SqliteOriginal,
  SupabaseOriginal,
  SvelteOriginal,
  SwiftOriginal,
  TauriOriginal,
  TensorflowOriginal,
  TypescriptOriginal,
  VuejsOriginal,
} from "devicons-react";

const iconSize = "24";

export const technologyIconMap: { [key: string]: React.ReactNode } = {
  // Technologies & Libraries
  "next.js": <NextjsOriginal size={iconSize} />,
  sveltekit: <SvelteOriginal size={iconSize} />,
  django: <DjangoPlain size={iconSize} />,
  "ruby on rails": <RubyOriginal size={iconSize} />,
  react: <ReactOriginal size={iconSize} />,
  "react native": <ReactOriginal size={iconSize} />,
  angular: <AngularjsOriginal size={iconSize} />,
  "vue.js": <VuejsOriginal size={iconSize} />,
  flask: <FlaskOriginal size={iconSize} className="theme-aware-icon" />,
  "express.js": (
    <ExpressOriginal size={iconSize} className="theme-aware-icon" />
  ),
  "spring boot": <SpringOriginal size={iconSize} />,
  flutter: <FlutterOriginal size={iconSize} />,
  tensorflow: <TensorflowOriginal size={iconSize} />,
  pytorch: <PytorchOriginal size={iconSize} />,
  "scikit-learn": <ScikitlearnOriginal size={iconSize} />,
  pandas: <PandasOriginal size={iconSize} />,
  qt: <QtOriginal size={iconSize} />,
  electron: <ElectronOriginal size={iconSize} />,
  fastapi: <FastapiOriginal size={iconSize} />,
  laravel: <LaravelOriginal size={iconSize} />,
  "asp.net core": <DotNetOriginal size={iconSize} />,
  "nest.js": <NestjsOriginal size={iconSize} className="theme-aware-icon" />,
  ".net maui": <DotNetOriginal size={iconSize} />,
  numpy: <NumpyOriginal size={iconSize} />,
  swiftui: <SwiftOriginal size={iconSize} />,
  "jetpack compose": <KotlinOriginal size={iconSize} />,
  tauri: <TauriOriginal size={iconSize} />,

  // Languages
  typescript: <TypescriptOriginal size={iconSize} />,
  javascript: <JavascriptOriginal size={iconSize} />,
  python: <PythonOriginal size={iconSize} />,
  ruby: <RubyOriginal size={iconSize} />,
  java: <JavaOriginal size={iconSize} />,
  swift: <SwiftOriginal size={iconSize} />,
  kotlin: <KotlinOriginal size={iconSize} />,
  "c++": <CplusplusOriginal size={iconSize} />,
  c: <COriginal size={iconSize} />,
  dart: <DartOriginal size={iconSize} />,
  lua: <LuaOriginal size={iconSize} />,
  powershell: <PowershellOriginal size={iconSize} />,
  bash: <BashOriginal size={iconSize} />,
  rust: <RustOriginal size={iconSize} />,
  php: <PhpOriginal size={iconSize} />,
  "c#": <CsharpOriginal size={iconSize} />,
  svelte: <SvelteOriginal size={iconSize} />,

  // Databases
  postgresql: <PostgresqlOriginal size={iconSize} />,
  mysql: <MysqlOriginal size={iconSize} />,
  mongodb: <MongodbOriginal size={iconSize} />,
  redis: <RedisOriginal size={iconSize} />,
  sqlite: <SqliteOriginal size={iconSize} />,
  firebase: <FirebasePlain size={iconSize} />,
  supabase: <SupabaseOriginal size={iconSize} />,
  pinecone: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0.89em"
      height="1em"
      viewBox="0 0 256 288"
      className="theme-aware-icon"
    >
      <path
        fill="#201D1E"
        d="M108.634 254.436c9.08 0 16.44 7.361 16.44 16.442s-7.36 16.44-16.44 16.44s-16.442-7.36-16.442-16.44s7.361-16.442 16.442-16.442m91.216-29.998l16.247 4.814L203.2 272.78a8.47 8.47 0 0 1-8.7 6.046l-3.983-.273l-.098.08l-41.39-2.904l1.152-16.906l27.808 1.887l-18.205-26.262l13.926-9.656l18.229 26.295zm-176.837-30.09l16.903 1.197l-1.98 27.804L64.15 205.12l9.677 13.91l-26.248 18.248l26.792 7.895l-4.79 16.255l-43.732-12.885a8.47 8.47 0 0 1-6.058-8.726zM132.15 170.67l30.508 36.832l-13.75 11.389l-18.156-21.92l-5.886 33.702l-17.587-3.074l5.892-33.755l-24.442 14.412l-9.063-15.383l41.079-24.2a8.93 8.93 0 0 1 11.405 1.997m85.354-24.71l15.239-8.292l22.2 40.805a8.675 8.675 0 0 1-1.926 10.69l-3.141 2.714l-32.05 27.893l-11.386-13.09l21.548-18.747l-32.095-5.781l3.078-17.074l32.073 5.779zM37.782 103.298l11.48 13.008l-21.251 18.743l32.156 5.614l-2.98 17.091l-32.192-5.618l13.827 24.998l-15.18 8.398l-22.558-40.776a8.675 8.675 0 0 1 1.85-10.703zm108.694-13.42l30.404 36.734l-13.753 11.384l-18.152-21.93l-5.886 33.712l-17.587-3.074l5.872-33.624l-24.349 14.274l-9.027-15.403l37.4-21.929l.038-.142l.165.021l3.485-2.032a8.93 8.93 0 0 1 11.39 2.01m39.18-18.065l6.65-16.024l43.012 17.85a8.675 8.675 0 0 1 5.218 9.517l-.716 3.982l-7.345 41.78l-17.086-3.01l4.924-27.968l-28.537 15.772l-8.386-15.188l28.591-15.784zm-81.939-31.577l.74 17.334l-28.414 1.214l21.43 24.49l-13.056 11.424L62.95 70.173l-5.001 28l-17.078-3.054l8.184-45.759a8.674 8.674 0 0 1 8.17-7.139l4.02-.18l.09-.065zm58.121-36.965l30.267 36.965l-13.814 11.31l-17.964-21.943l-6.059 33.668l-17.57-3.162l6.068-33.743l-24.526 14.34l-9.007-15.415L150.428 1.22a8.93 8.93 0 0 1 11.41 2.052"
      />
    </svg>
  ),
};
