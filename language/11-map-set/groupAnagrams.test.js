/**
 * groupAnagrams(words) — an array of groups. Groups are in order of their
 * first word's appearance, and words keep their input order inside a group.
 */
import { describe, it, expect } from "vitest";
import { groupAnagrams } from "./groupAnagrams.js";

describe("groupAnagrams", () => {
  it("groups anagrams together", () => {
    expect(groupAnagrams(["listen", "google", "silent", "enlist"])).toEqual([
      ["listen", "silent", "enlist"],
      ["google"],
    ]);
  });

  it("puts each non-anagram in its own group", () => {
    expect(groupAnagrams(["a", "b"])).toEqual([["a"], ["b"]]);
  });

  it("returns [] for no words", () => {
    expect(groupAnagrams([])).toEqual([]);
  });

  it.todo("treats words with the same letters but different counts as different ('aab' vs 'abb')");
});
