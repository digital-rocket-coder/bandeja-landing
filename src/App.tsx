import { Nav } from "@/sections/nav"
import { Hero } from "@/sections/hero"
import { Idea } from "@/sections/idea"
import { Problem } from "@/sections/problem"
import { PlayerPath } from "@/sections/player-path"
import { Product } from "@/sections/product"
import { Final, Footer, Launch, Market, Marketplace, Monetization } from "@/sections/business"

export default function App() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Idea />
        <Problem />
        <PlayerPath />
        <Product />
        <Marketplace />
        <Monetization />
        <Market />
        <Launch />
        <Final />
      </main>
      <Footer />
    </>
  )
}
