import { adminPromise } from '@/content/capabilities'

/** The standing promise that every client site ships with its own admin console. */
export default function AdminPromise() {
  return (
    <section aria-labelledby="admin-promise-title" className="surface-cream pb-20 md:pb-28">
      <div className="container-site">
        <div className="reveal grid gap-6 rounded-2xl bg-noir p-8 text-cream sm:p-12 md:grid-cols-12 md:items-center md:gap-10">
          <p className="eyebrow text-gold md:col-span-3">Included with every build</p>
          <div className="md:col-span-9">
            <h2 id="admin-promise-title" className="display-m">
              {adminPromise.title}
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-mist">{adminPromise.body}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
