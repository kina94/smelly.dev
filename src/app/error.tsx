"use client";
import { ErrorMessage } from "@/widgets";

export default function error({ error }: { error: Error }) {
  return <ErrorMessage message={error.message} />;
}
