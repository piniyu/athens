(ns athens.common.utils-test
  (:require
    [athens.common.utils :as utils]
    [clojure.test        :as t]))


(t/deftest lazy-cat-while
  (let [stopped?   (atom false)
        reset      (fn []
                     (reset! stopped? false))
        f          (fn [i]
                     ;; Each call returns 2 elements
                     ;; e.g. 4 -> [5 :-]
                     ;; We increment i to make it easier to
                     ;; reason about take and stop?.
                     [(inc i) :-])
        stop?      (fn [[x]]
                     ;; Stops when the first element of the seq is
                     ;; greater than five.
                     (when (>= x 5)
                       (reset! stopped? true)
                       true))]

    (t/testing "take matches stop point"
      (reset)
      (let [res (take 10 (utils/range-mapcat-while f stop?))]
        ;; 5 :- is not returned because take-while stops there.
        (t/is (= res '(1 :- 2 :- 3 :- 4 :-)))
        ;; stop? was called.
        (t/is @stopped?)))

    (t/testing "take more than stop point"
      (reset)
      (let [res (take 20 (utils/range-mapcat-while f stop?))]
        ;; Same results as taking up to stop point.
        (t/is (= res '(1 :- 2 :- 3 :- 4 :-)))
        (t/is @stopped?)))

    (t/testing "take less than stop point"
      (reset)
      (let [res (take 1 (utils/range-mapcat-while f stop?))]
        ;; Only got the very first element.
        (t/is (= res '(1)))
        ;; Never got to the point where stop? was called.
        ;; This is the really important part.
        (t/is (not @stopped?))))))

