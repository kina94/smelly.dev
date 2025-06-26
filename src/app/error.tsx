"use client";
import ErrorMessage from "@/shared/ui/ErrorMessage";
import React from "react";

export default function error({ error }: { error: Error }) {
  return <ErrorMessage message={error.message} />;
}
