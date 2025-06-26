import React from "react";

export default function Title({ title }: { title: string }) {
  return <h1 className="text-left mb-12 text-hero">{title}</h1>;
}
