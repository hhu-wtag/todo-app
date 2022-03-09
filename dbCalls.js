import supabase from "./supabase.js"

export async function getAllDataFromDB() {
  const { data, error } = await supabase
    .from("Todo")
    .select()
    .order("created_at", { ascending: false })

  return {
    data,
    error,
  }
}

export async function getFilterdData(done, searchText) {
  const { data, error } = await supabase
    .from("Todo")
    .select()
    .match({ done })
    .ilike("title", `%${searchText}%`)
    .order("created_at", { ascending: false })

  return {
    data,
    error,
  }
}

export async function getAllFilterdData(searchText) {
  const { data, error } = await supabase
    .from("Todo")
    .select()
    .ilike("title", `%${searchText}%`)
    .order("created_at", { ascending: false })

  return {
    data,
    error,
  }
}

export async function insertDataToDB(state) {
  const { title } = state

  const { data, error } = await supabase.from("Todo").insert([
    {
      title: title,
    },
  ])

  return {
    data,
    error,
  }
}

export async function deleteDataByID(id) {
  const { data, error } = await supabase.from("Todo").delete().match({ id })

  return {
    data,
    error,
  }
}

export async function updateDataByID(id, state) {
  const { data, error } = await supabase
    .from("Todo")
    .update({ title: state })
    .match({ id })

  return {
    data,
    error,
  }
}

export async function updateDone(id, doneIn) {
  const { data, error } = await supabase
    .from("Todo")
    .update({ done: true, doneIn })
    .match({ id })

  return {
    data,
    error,
  }
}

export async function searchDB(searchText) {
  const { data, error } = await supabase
    .from("Todo")
    .select()
    .ilike("title", `%${searchText}%`)

  return { data, error }
}
