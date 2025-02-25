function ElectricWeb(autolisten = [], autolistenOnce = []) {
  const ensureField = (x, k, v) => {
    if (!x[k]) {
      x[k] = v
    }
  }
  const yellAbout = (lookup) => (name, fn) => {
    ensureField(lookup, name, [])
    const ref = lookup[name]
    if (!ref.includes(fn)) {
      lookup[name].push(fn)
    }
  }
  const array = (x) => (x || []).slice(0)
  const create = () => {
    const $ = Object.create(null)
    let $events = {}
    let $onceEvents = {}
    $.on = yellAbout($events)
    $.once = yellAbout($onceEvents)
    $.off = function off(name, fn) {
      const ref = $events[name]
      if (!ref || !ref.length) return
      const index = ref.indexOf(fn)
      if (index > -1) {
        $events[name] = $events[name].splice(index, 1)
      }
    }
    $.signal = function signal(name, args = []) {
      array($events[name]).forEach((x) => {
        x.apply($, args)
      })
      array($onceEvents[name]).forEach((x) => {
        $.off(name, x)
        delete $onceEvents[name]
        x.apply($, args)
      })
    }
    $.stop = function stop() {
      $events = {}
      $onceEvents = {}
    }
    return $
  }
  // TODO: maybe a way of relating multiple instances of this?
  // seems like both a bad idea and also a good solution >:(
  const web = create()
  autolisten.forEach(([n, fn]) => {
    if (n && typeof fn === "function") {
      web.on(n, fn)
    }
  })
  autolistenOnce.forEach(([n, fn]) => {
    if (n && typeof fn === "function") {
      web.once(n, fn)
    }
  })
  return web
}

export default ElectricWeb
