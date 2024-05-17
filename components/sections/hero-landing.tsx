import Link from "next/link";

import { env } from "@/env.mjs";
import { siteConfig } from "@/config/site";
import { cn, nFormatter } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

export async function HeroLanding() {
  const { stargazers_count: stars } = await fetch(
    "https://api.github.com/repos/mickasmt/next-saas-stripe-starter",
    {
      ...(env.GITHUB_OAUTH_TOKEN && {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }),
      // data will revalidate every hour
      next: { revalidate: 3600 },
    },
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));

  return (
      <section className="space-y-6 pb-12 pt-16 lg:py-18">
        <div className="container flex max-w-[64rem] flex-col items-center gap-5 text-center">
          <Link
            href="https://github.com/cameronking4"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "animate-fade-up opacity-0")}
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
            target="_blank"
          >
          <span className="mr-3">🎉</span> Welcome to the Future of Drive Thru{" "}
          {/* <Icons.post className="ml-2 size-3.5" /> */}
        </Link>

        <h1 className="text-balance font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]">
          Automate your drive-thru lane{" "}
          <span className="text-gradient_indigo-purple font-extrabold">
         with AI voice ordering
          </span>  and{" "} save $$$
        </h1>

        <p
          className="max-w-2xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          We integrate with your <Link href={"#"}>QuPOS or similar</Link> system to deliver voice ordering capabilities for less than minimum wage.
        </p>

        <div
          className="flex justify-center space-x-2 md:space-x-4"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <Link
            href="/pricing"
            prefetch={true}
            className={cn(
              buttonVariants({ size: "lg", rounded: "full" }),
              "gap-2",
            )}
          >
            <span>Pricing that pays itself</span>
            <Icons.arrowRight className="size-4" />
          </Link>
          <Link
            href={"/login"}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
                rounded: "full",
              }),
              "px-5",
            )}
          >
            <Icons.google className="mr-2 size-4" />
            <p>
              <span className="hidden sm:inline-block">Join the waitlist</span>
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
