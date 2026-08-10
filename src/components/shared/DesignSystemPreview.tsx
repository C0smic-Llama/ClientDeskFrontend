import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function DesignSystemPreview() {
  return (
    <div className="min-h-screen bg-white p-8 text-black">
      <div className="mx-auto max-w-5xl space-y-10">
        <div>
          <h1 className="text-4xl font-bold">ClientDesk</h1>
          <p className="mt-2 text-clientdesk-gray">
            Design System Preview
          </p>
        </div>

        {/* Colors */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Colors</h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-xl bg-clientdesk-gray p-6 text-white">
              #898989
            </div>

            <div className="rounded-xl bg-clientdesk-light p-6">
              #D9D9D9
            </div>

            <div className="rounded-xl bg-clientdesk-red p-6 text-white">
              #FF4D4D
            </div>

            <div className="rounded-xl bg-clientdesk-mint p-6">
              #4DFFBC
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Typography</h2>

          <div className="space-y-2">
            <h1 className="text-4xl font-bold">
              ClientDesk Heading
            </h1>

            <h2 className="text-2xl font-semibold">
              Section Heading
            </h2>

            <p className="text-clientdesk-gray">
              This is standard ClientDesk body text.
            </p>

            <p className="font-sidebar text-2xl">
              Sidebar Typography — Oswald
            </p>
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Buttons</h2>

          <div className="flex flex-wrap gap-3">
            <Button className="bg-clientdesk-red hover:bg-clientdesk-red/90">
              Primary Action
            </Button>

            <Button variant="outline">
              Secondary Action
            </Button>

            <Button variant="destructive">
              Delete
            </Button>
          </div>
        </section>

        {/* Inputs */}
        <section className="max-w-md space-y-4">
          <h2 className="text-2xl font-semibold">Inputs</h2>

          <Input placeholder="Enter client name..." />
        </section>

        {/* Badges */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Statuses</h2>

          <div className="flex flex-wrap gap-3">
            <Badge className="bg-clientdesk-mint text-black">
              Active
            </Badge>

            <Badge className="bg-clientdesk-light text-black">
              Pending
            </Badge>

            <Badge className="bg-clientdesk-red text-white">
              Overdue
            </Badge>

            <Badge variant="outline">
              Draft
            </Badge>
          </div>
        </section>

        {/* Card */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Card</h2>

          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>Total Clients</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold">42</p>

              <p className="mt-1 text-sm text-clientdesk-gray">
                Active clients
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}