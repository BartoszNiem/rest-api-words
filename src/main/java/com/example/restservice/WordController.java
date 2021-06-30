package com.example.restservice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

/**
 *     *1* Adding words to collection
 *     *2* Deleting words from collection
 *     *3* Getting the number of appearances of the word in collection
 *     *4* Getting all unique words from collection
 */

@RestController
@CrossOrigin
public class WordController {

    List<String> words = new ArrayList<>();

    //*1* Adding words to collection
    @PostMapping("/wordapi/addword/{addedWord}")
    public ResponseEntity<Void> addWord(@PathVariable String addedWord) {
        if (addedWord == null) return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);

        words.add(addedWord);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    //*2* Deleting words from collection
    @DeleteMapping("/wordapi/deleteword/{deleteWord}")
    public ResponseEntity<Void> deleteWord(@PathVariable String deleteWord) {
        if (deleteWord == null) return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);

        words = words.stream()
                .filter(word -> !word.equals(deleteWord))
                .collect(Collectors.toList());
        //return ResponseEntity.noContent().build();
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    //*3* Getting the number of appearances of the word in collection
    @GetMapping("/wordapi/getnumofappearance/{searchedWord}")
    public long getNumberOfAppearance(@PathVariable String searchedWord) {
        if (searchedWord == null) return 0;

        return words.stream()
                .filter(word -> word.equals(searchedWord))
                .count();
    }

    //*4* Getting all unique words from collection
    @GetMapping("/wordapi/getuniquewords")
    public List<String> getUniqueWords() {
        Set<String> wordsSet = new LinkedHashSet<>();
        wordsSet.addAll(words);

        return new ArrayList<>(wordsSet);
    }
}