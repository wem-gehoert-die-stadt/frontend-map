import express from 'express'
import cors from 'cors'

const addressImporter = {
  augsburg: () =>
    import('../src/preprocessing/generated/addresses-augsburg.json'),
  berlin: () => import('../src/preprocessing/generated/addresses-berlin.json'),
  bremen: () => import('../src/preprocessing/generated/addresses-bremen.json'),
  dresden: () =>
    import('../src/preprocessing/generated/addresses-dresden.json'),
  duesseldorf: () =>
    import('../src/preprocessing/generated/addresses-duesseldorf.json'),
  erfurt: () => import('../src/preprocessing/generated/addresses-erfurt.json'),
  'frankfurt-am-main': () =>
    import('../src/preprocessing/generated/addresses-frankfurt-am-main.json'),
  'freiburg-im-breisgau': () =>
    import(
      '../src/preprocessing/generated/addresses-freiburg-im-breisgau.json'
    ),
  gera: () => import('../src/preprocessing/generated/addresses-gera.json'),
  hamburg: () =>
    import('../src/preprocessing/generated/addresses-hamburg.json'),
  heidelberg: () =>
    import('../src/preprocessing/generated/addresses-heidelberg.json'),
  jena: () => import('../src/preprocessing/generated/addresses-jena.json'),
  koeln: () => import('../src/preprocessing/generated/addresses-koeln.json'),
  leipzig: () =>
    import('../src/preprocessing/generated/addresses-leipzig.json'),
  lueneburg: () =>
    import('../src/preprocessing/generated/addresses-lueneburg.json'),
  muenchen: () =>
    import('../src/preprocessing/generated/addresses-muenchen.json'),
  nuernberg: () =>
    import('../src/preprocessing/generated/addresses-nuernberg.json'),
  potsdam: () =>
    import('../src/preprocessing/generated/addresses-potsdam.json'),
  saarbruecken: () =>
    import('../src/preprocessing/generated/addresses-saarbruecken.json'),
  stuttgart: () =>
    import('../src/preprocessing/generated/addresses-stuttgart.json'),
  weimar: () => import('../src/preprocessing/generated/addresses-weimar.json'),
  wuerzburg: () =>
    import('../src/preprocessing/generated/addresses-wuerzburg.json'),
}
const addressImporterPublic = {
  augsburg: () =>
    import('../src/preprocessing/generated/addresses-augsburg-public.json'),
  berlin: () =>
    import('../src/preprocessing/generated/addresses-berlin-public.json'),
  bremen: () =>
    import('../src/preprocessing/generated/addresses-bremen-public.json'),
  dresden: () =>
    import('../src/preprocessing/generated/addresses-dresden-public.json'),
  duesseldorf: () =>
    import('../src/preprocessing/generated/addresses-duesseldorf-public.json'),
  erfurt: () =>
    import('../src/preprocessing/generated/addresses-erfurt-public.json'),
  'frankfurt-am-main': () =>
    import(
      '../src/preprocessing/generated/addresses-frankfurt-am-main-public.json'
    ),
  'freiburg-im-breisgau': () =>
    import(
      '../src/preprocessing/generated/addresses-freiburg-im-breisgau-public.json'
    ),
  gera: () =>
    import('../src/preprocessing/generated/addresses-gera-public.json'),
  hamburg: () =>
    import('../src/preprocessing/generated/addresses-hamburg-public.json'),
  heidelberg: () =>
    import('../src/preprocessing/generated/addresses-heidelberg-public.json'),
  jena: () =>
    import('../src/preprocessing/generated/addresses-jena-public.json'),
  koeln: () =>
    import('../src/preprocessing/generated/addresses-koeln-public.json'),
  leipzig: () =>
    import('../src/preprocessing/generated/addresses-leipzig-public.json'),
  lueneburg: () =>
    import('../src/preprocessing/generated/addresses-lueneburg-public.json'),
  muenchen: () =>
    import('../src/preprocessing/generated/addresses-muenchen-public.json'),
  nuernberg: () =>
    import('../src/preprocessing/generated/addresses-nuernberg-public.json'),
  potsdam: () =>
    import('../src/preprocessing/generated/addresses-potsdam-public.json'),
  saarbruecken: () =>
    import('../src/preprocessing/generated/addresses-saarbruecken-public.json'),
  stuttgart: () =>
    import('../src/preprocessing/generated/addresses-stuttgart-public.json'),
  weimar: () =>
    import('../src/preprocessing/generated/addresses-weimar-public.json'),
  wuerzburg: () =>
    import('../src/preprocessing/generated/addresses-wuerzburg-public.json'),
}

const app = express()
app.use(cors())
app.get('/addresses', async (request, result) => {
  const { city, internal } = request.query
  if (!city) {
    return result.sendStatus(400)
  }
  const addresses = (
    await (internal !== undefined ? addressImporter : addressImporterPublic)[
      city as string
    ]()
  ).default
  result.send(addresses)
})
await app.listen(3010)

// eslint-disable-next-line no-console
console.log('Tiny-backend running!')
