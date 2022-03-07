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
