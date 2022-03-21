import { getGlobalState, updateGlobalState } from "./Helpers/globalState.js"
import supabase from "./supabase.js"

export async function getAllDataFromDB() {
  const { data, error } = await supabase
    .from("Todo")
    .select()
    .order("created_at", { ascending: false })

  updateGlobalState({
    fetchedDataLength: data.length,
  })

  return {
    data,
    error,
  }
}

export async function getDataOnLoadMore(searchText) {
  let { activeFilter } = getGlobalState()

  const { data, error } = await supabase
    .from("Todo")
    .select()
    .ilike("title", `%${searchText}%`)
    .order("created_at", { ascending: false })

  let filteredData = []

  if (activeFilter === "inc") {
    filteredData = data.filter((item) => !item.done)
  } else if (activeFilter === "com") {
    filteredData = data.filter((item) => item.done)
  } else filteredData = data

  updateGlobalState({
    fetchedDataLength: filteredData.length,
  })

  return {
    filteredData,
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

  updateGlobalState({
    fetchedDataLength: data.length,
  })

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

  if (data) {
    updateGlobalState({
      fetchedDataLength: data.length,
    })
  }

  return { data, error }
}
